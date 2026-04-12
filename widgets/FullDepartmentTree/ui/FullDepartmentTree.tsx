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
				placeholder="Выберите отдел"
			/>
		),
		[departments],
	)

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
	// console.log(width)

	const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current
		if (drag && e.pointerId === drag.pointerId && e.pointerId) {
			dragRef.current = null
			e.currentTarget.releasePointerCapture(e.pointerId)
		}
	}, [])

	return (
		<div className="department-tree-panel" style={{ width: width }}>
			<div style={{ position: "sticky", top: "10px" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
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
						<DepartmentTree />
					</Can>
				</div>
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
