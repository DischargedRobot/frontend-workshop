"use client"

import "./FullDepartmentTree.scss"

import { DepartmentTree, IDepartment, IService, useDepartmentsStore } from "@/entities/Departments"
import { AddDepartment } from "@/features/AddDepartment"
import { useFullDepartmentTree } from "../model"
import { DeleteSelectedDepartments } from "@/features/DeleteSelectedDepartments"
import { Can } from "@/shared/model/Ability"
import { useCallback, useState } from "react"
import useResizableWidth from "../model/useResizableWidth"
import { ChangeVisibleServicePanel } from "@/features/ChangeVisibleServicePanel"
import { userApiClient } from "@/entities/User/api"
import { useUsersStore, useUserFiltersStore } from "@/entities/User"
import { mutate, useSWRConfig } from "swr"
import { useAPIErrorHandler } from "@/shared/api/APIErrorHandler"
import { SelectDepartmentSearchDropMenu } from "@/features/SelectDepartmentSearchDropMenu"
import { mapAPIErrors } from "@/shared/api"
import { ToggleEditable } from "@/features/ToggleEditable"
import { showToast } from "@/shared/ui/Toast"
import { ShowService } from "@/features/ShowService"
import { Grid } from "antd"

const { useBreakpoint } = Grid


const FullDepartmentTree = () => {
	const { organization, departments } = useFullDepartmentTree()
	const [service, setService] = useState<null | IService>(null)
	const DepartmentSelector = useCallback(
		({ onChange }: { onChange: (id: number) => void }) => (
			<SelectDepartmentSearchDropMenu
				departments={departments}
				onSelect={(dep) => dep && onChange(dep.id)}
				placeholder="Родительский отдел"
			/>
		),
		[departments],
	)

	// ресайз вынесен в хук
	const { width, onPointerDown, onPointerMove, onPointerUp } = useResizableWidth(250)

	const handleError = useAPIErrorHandler([{
		error: mapAPIErrors(404),
		handler: () => { }
	}])

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
	const addDepartmentId = useUserFiltersStore((s) => s.addDepartmentId)
	const removeDepartmentId = useUserFiltersStore((s) => s.removeDepartmentId)
	const setDepartmentIds = useUserFiltersStore((s) => s.setDepartmentIds)

	// const rootDepartments = useDepartmentsStore((state) => state.child.children) || []

	// при установке check добавляем id в фильтры и подгружаем пользователей
	const onCheckLeaf = useCallback((department: IDepartment, checkedKeys: number[]) => {
		// Если ни один отедл выдлене не блы, значит там сидят корневые
		// и нужно их убрать, поэтому сет
		// console.log(checkedKeys, "OnCheckLeaf")
		if (checkedKeys.length === 1) {
			setDepartmentIds([department.id])
		} else {
			addDepartmentId(department.id)
		}

		const key = [["users", "departmentId"], ["all", department.id]].toString()
		const cached = cache.get(key)?.data
		if (cached) addUsers(cached)
		mutate(key, () => userApiClient.getUsersByDepartment(department))
			.then(users => { if (users) addUsers(users) })
			.catch(handleError)
	}, [addUsers, cache, handleError, addDepartmentId, setDepartmentIds])

	// при снятии check с листа дерева отделов удаляем id из фильтров (не удаляем пользователей из стора)
	const onUncheckLeaf = useCallback((department: IDepartment, checkedKeys: number[]) => {
		removeDepartmentId(department.id)
		// Если после удаления не осталось выбранных отделов — ставим корневые (центральные)
		// console.log(checkedKeys, "onUncheckLeaf")
		if (checkedKeys.length === 0) {
			const rootDepartments = useDepartmentsStore.getState().departments[0].children || []
			const rootIds = rootDepartments.map((d) => d.id)
			setDepartmentIds(rootIds)
		}
	}, [removeDepartmentId, setDepartmentIds])

	const [isEditable, setIsEditable] = useState(false)
	const [isServiceOpen, setIsServiceOpen] = useState(false)


	const isMobile = !useBreakpoint().md
	return (
		<div className="department-tree-panel" style={{ width: width }}>
			<div className="department-tree-panel__container">
				<div className="department-tree-panel__title title text_big">
					<h2>{organization.name}</h2>
					<div className="department-tree-panel__buttons">
						<Can I="create" a="Department">
							<AddDepartment
								DepartmentSelector={DepartmentSelector}
								onServiceCreated={(service) => {
									setService(service)
									setIsServiceOpen(true)
								}}
							/>
						</Can>
						<Can I="delete" a="Department">
							<DeleteSelectedDepartments />
						</Can>
						<Can I="update" a="Department">
							<ToggleEditable isEditable={isEditable} onClick={(e) => setIsEditable(prev => !prev)} />
						</Can>
					</div>
				</div>
				<Can I="read" a="Department">
					<DepartmentTree
						isEditable={isEditable}
						onLoaded={onLoadedDepartments}
						onCheckLeaf={onCheckLeaf}
						onUncheckLeaf={onUncheckLeaf}
					/>
				</Can>
			</div>
			{!isMobile &&
				<div
					className="resize-column"
					onPointerDown={onPointerDown}
					onPointerMove={onPointerMove}
					onPointerUp={onPointerUp}
					onPointerCancel={onPointerUp}
				></div>}
			{service !== null &&
				<ShowService
					service={service}
					isOpen={isServiceOpen}
					onCancel={() => setIsServiceOpen(false)}
				/>}
		</div>
	)
}

export default FullDepartmentTree
