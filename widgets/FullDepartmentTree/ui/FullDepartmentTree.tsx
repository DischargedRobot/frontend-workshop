"use client"

import "./FullDepartmentTree.scss"

import { DepartmentTree, IDepartment, IService } from "@/entities/Departments"
import { AddDepartment } from "@/features/AddDepartment"
import { useFullDepartmentTree } from "../model"
import { DeleteSelectedDepartments } from "@/features/DeleteSelectedDepartments"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { Can } from "@/shared/model/Ability"
import { PointerEvent, useCallback, useMemo, useRef, useState } from "react"
import { ChangeVisibleServicePanel } from "@/features/ChangeVisibleServicePanel"
import { userApiClient } from "@/entities/User/api"
import { useUsersStore } from "@/entities/User"
import { mutate, useSWRConfig } from "swr"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"

const TREE_MIN_W = 180
const TREE_DEFAULT_W = 250
const TREE_MAX_W = 360
const TREE_MAX_VW = 0.4
const treeMaxWidthPx = () => {
	if (typeof window === "undefined") {
		return TREE_MAX_W // Fallback для сервера
	}
	return Math.min(TREE_MAX_W, Math.round(window.innerWidth * TREE_MAX_VW))
}

const clampWidth = (width: number) => {
	return Math.max(TREE_MIN_W, Math.min(treeMaxWidthPx(), width))
}

const FullDepartmentTree = () => {
	const { organization, departments } = useFullDepartmentTree()
	const [service, setService] = useState<null | IService>(null)

	const DepartmentSelector = useCallback(
		({ onChange }: { onChange: (id: number) => void }) => (
			<SearchDropDownMenu<IDepartment>
				options={departments.map((dep) => ({
					key: dep.id,
					label: dep.name,
					value: dep,
				}))}
				onSelect={(dep) => dep && onChange(dep.id)}
				placeholder="Родительский отдел"
			/>
		),
		[departments],
	)

	// TODO: вынести ресайз в хук
	const dragRef = useRef<{
		startX: number
		startW: number
		pointerId: number
	} | null>(null)
	const [width, setWidth] = useState(TREE_DEFAULT_W)

	const onPointerDown = useCallback(
		(e: PointerEvent<HTMLDivElement>) => {
			e.currentTarget.setPointerCapture(e.pointerId)
			dragRef.current = {
				startW: width,
				startX: e.clientX,
				pointerId: e.pointerId,
			}
		},
		[width],
	)

	const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
		const d = dragRef.current
		if (!d || e.pointerId !== d.pointerId) return
		const next = clampWidth(d.startW + (e.clientX - d.startX))
		setWidth(next)
	}, [])

	const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current
		if (drag && e.pointerId === drag.pointerId && e.pointerId) {
			dragRef.current = null
			e.currentTarget.releasePointerCapture(e.pointerId)
		}
	}, [])

	const handleError = useAPIErrorHandler()

	// При загрузке дерева отделов 
	const setUsers = useUsersStore((state) => state.setUsers)
	const onLoadedDepartments = useCallback(async (department: IDepartment[]) => {
		const key = [["users", "departmentIds"], ["all", department.map((dep) => dep.id)]].toString()

		const users = await mutate(key,
			userApiClient.getUsersByDepartments(department))
			.catch(handleError)

		setUsers(users ?? [])
	}, [setUsers, handleError])


	// При выделении листа дерева отделов подгружаем юзеров этого отдела в стор, 
	// при снятии выделения удаляем юзеров этого отдела из стора
	const { cache } = useSWRConfig()
	const addUsers = useUsersStore((state) => state.addUsers)
	const onCheckLeaf = useCallback((department: IDepartment) => {
		const key = [["users", "departmentId"], ["all", department.id]].toString()

		// Сразу используем кеш, если есть
		const cached = cache.get(key)?.data
		if (cached) addUsers(cached)

		// Всегда подгружаем свежие данные в фоне
		mutate(key, () => userApiClient.getUsersByDepartment(department))
			.then(users => { if (users) addUsers(users) })
			.catch(handleError)
	}, [addUsers, cache, handleError])

	// при снятии check с листа дерева отделов удаляем юзеров этого отдела из стора
	const deleteUsersByDepartmentId = useUsersStore((state) => state.deleteUsersByDepartmentId)
	const onUncheckLeaf = useCallback((department: IDepartment) => {
		deleteUsersByDepartmentId(department.id)
	}, [deleteUsersByDepartmentId])

	return (
		<div className="department-tree-panel" style={{ width: width }}>
			<div className="department-tree-panel__container">
				<div className="department-tree-panel__title title text_big">
					<h2>{organization.name}</h2>
					<div className="department-tree-panel__buttons">
						<Can I="create" a="Department">
							<AddDepartment
								DepartmentSelector={DepartmentSelector}
								onServiceCreated={setService}
							/>
						</Can>
						<Can I="delete" a="Department">
							<DeleteSelectedDepartments />
						</Can>
					</div>
				</div>
				<Can I="read" a="Department">
					<DepartmentTree
						onLoaded={onLoadedDepartments}
						onCheckLeaf={onCheckLeaf}
						onUncheckLeaf={onUncheckLeaf}
					/>
				</Can>
			</div>
			<div
				className="resize-column"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
			></div>
			<ChangeVisibleServicePanel service={service} />
		</div>
	)
}

export default FullDepartmentTree
