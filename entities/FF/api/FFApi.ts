import { IDepartment } from "@/entities/Departments/lib"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { IFeatureFlag } from "../lib/types"
import { isFFAPIError } from "@/shared/api"
import { FFAPIErrors } from "@/shared/api/APIErrors"

const URL_ORGANIZATION = process.env.NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1

interface FFByRelatedDepartmentResponse {
	featureFlag: IFFresponse
	belongsToNode: Omit<IDepartment, "children" | "featureFlags">
}

interface IFFsByDepartmentRelatedResponse {
	nodeId: number
	items: FFByRelatedDepartmentResponse[]
	limit: number
	offset: number
	total: number
}

interface IFFresponse {
	lastUpdate: string
	id: number
	nodeId: number
	name: string
	value: boolean
	version: number
}

interface IFeatureFlagByDepartmentResponse {
	nodeId: number
	items: IFFresponse[]
	limit: number
	offset: number
	total: number
}

interface IFFsResponse {
	nodeId: number
	FFs: IFeatureFlag[]
	limit: number
	offset: number
	total: number
}

const convertDateFF = (dateISO: string) =>
	new Date(dateISO).toLocaleString("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	})

const FFApi = {
	getFeatureFlagsByDepartment: async (
		department: IDepartment,
		organizationId: number,
		count: number,
		offset: number,
	): Promise<IFFsResponse> => {
		const responseData =
			await APIJsonRequest<IFeatureFlagByDepartmentResponse>(
				`${URL_ORGANIZATION}/${organizationId}/nodes/${department.id}/feature-flags?limit=${count}&offset=${offset}`,
			)
		const { items, ...other } = responseData
		return {
			FFs: items.map(({ nodeId, lastUpdate, ...ff }) => ({
				...ff,
				lastUpdate: convertDateFF(lastUpdate),
				departmentId: nodeId,
				departmentName: department.name,
			})),
			...other,
		}
	},

	// Получаем фича флаги по отделам
	getFFsByDepartments: async (
		department: IDepartment[],
		organizationId: number,
		count: number,
		offset: number,
	): Promise<{ FFs: IFeatureFlag[]; isEnd: boolean }> => {
		const FFs: IFeatureFlag[] = []
		let numberDepartment = department.length
		let isEnd = false

		while (count > 0 && numberDepartment > 0) {
			// запрашиваем у каждого отдела потихоньку пока не закончатся
			--numberDepartment
			try {
				const response = await FFApi.getFeatureFlagsByDepartment(
					department[numberDepartment],
					organizationId,
					count,
					offset,
				)

				count -= response.total

				FFs.push(...response.FFs)
			} catch (error) {
				continue
			}
		}

		// count не может быть < 0, так как total <= count всегда
		// тут count > 0
		if (count > 0 && numberDepartment > 0) {
			// тут 100% только > либо ===
			isEnd = true
		}

		return { FFs, isEnd }
	},

	// Получае фича флаги по департаменту и его детям
	getFFsByDepAndItsChildren: async (
		departmentId: number,
		organizationId: number,
	): Promise<IFeatureFlag[]> => {
		const responseData =
			await APIJsonRequest<IFFsByDepartmentRelatedResponse>(
				`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/feature-flags/linked?limit=100&offset=0&relation=descendant`,
			)
		return responseData.items.map(
			({
				featureFlag: { nodeId, lastUpdate, ...featureFlag },
				belongsToNode: belongsToNode,
			}) => ({
				...featureFlag,
				lastUpdate: convertDateFF(lastUpdate),
				departmentId: nodeId,
				departmentName: belongsToNode.name,
			}),
		)
	},

	getFFsByDepsAndTheyChildren: async (
		departmentIds: number[],
		organizationId: number,
	): Promise<IFeatureFlag[]> => {
		// Используем allSettled, чтобы не ломать объединение при ошибке одного из запросов
		const response = await Promise.allSettled(
			departmentIds.map((departmentId) =>
				FFApi.getFFsByDepAndItsChildren(departmentId, organizationId),
			),
		)

		const successful: IFeatureFlag[][] = []
		response.forEach((resp) => {
			if (resp.status === "fulfilled") {
				successful.push(resp.value)
			}
		})

		return successful.reduce((allDepartments, departments) => {
			return [...departments, ...allDepartments]
		}, [])
	},

	getFFById: async (
		organizationId: number,
		departmentId: number,
		featureFlag: IFeatureFlag,
	): Promise<IFeatureFlag> => {
		const response = await APIJsonRequest<IFFresponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/feature-flags/${featureFlag.id}`,
		)
		const { nodeId, lastUpdate, ...ff } = response

		return {
			...ff,
			lastUpdate: convertDateFF(lastUpdate),
			departmentId: nodeId,
			departmentName: featureFlag.departmentName,
		}
	},

	switchFF: async (
		organizationId: number,
		featureFlag: IFeatureFlag,
		isEnabled: boolean,
	): Promise<IFeatureFlag> => {
		const response = await APIJsonRequest<IFFresponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${featureFlag.departmentId}/feature-flags/${featureFlag.id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					value: isEnabled,
					version: featureFlag.version,
				}),
			},
		)
		const { nodeId, lastUpdate, ...ff } = response
		return {
			...ff,
			lastUpdate: convertDateFF(lastUpdate),
			departmentId: nodeId,
			departmentName: featureFlag.departmentName,
		}
	},

	removeFF: async (
		organizationId: number,
		departmentId: number,
		featureFlagId: number,
	) => {
		await APIJsonRequest(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/feature-flags/${featureFlagId}`,
			{ method: "DELETE" },
		)
	},

	// 2026-04-17T20:27:46.342245Z
	addFF: async (
		organizationId: number,
		nodeId: number,
		ff: Pick<IFeatureFlag, "name" | "value">,
	): Promise<IFeatureFlag> => {
		const {
			nodeId: nodeIdResponse,
			lastUpdate: lastUpdateResponse,
			...FFResponse
		} = await APIJsonRequest<IFFresponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${nodeId}/feature-flags`,
			{
				method: "POST",
				body: JSON.stringify({
					name: ff.name.trim(),
					value: ff.value,
				}),
			},
		)
		return {
			...FFResponse,
			lastUpdate: convertDateFF(lastUpdateResponse),
			departmentId: nodeIdResponse,
		}
	},
}

export default FFApi
