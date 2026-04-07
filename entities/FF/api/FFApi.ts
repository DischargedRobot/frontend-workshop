import { IDepartment } from "@/entities/Departments/lib"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { IFeatureFlag } from "../lib/types"
import { error } from "console"

const URL_ORGANISATION = process.env.NEXT_PUBLIC_API_ORGANISATIONS_URL_V1

interface IFFByDepartmentLinkedResponse {
	nodeId: number
	items: IFeatureFlagResponse[]
	limit: number
	offset: number
	total: number
}

interface IFFresponse {
	id: number
	nodeId: number
	name: string
	value: boolean
	version: number
}

interface IFeatureFlagByDepartmentResponse {
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

interface IFeatureFlagResponse {
	featureFlag: IFFresponse
	belongsToNode: Omit<IDepartment, "children" | "featureFlags">
}

const FFApi = {
	getFeatureFlagsByDepartment: async (
		departmentId: number,
		organisationId: number,
		count: number,
		offset: number,
	): Promise<IFFsResponse> => {
		const responseData =
			await APIJsonRequest<IFFByDepartmentLinkedResponse>(
				`${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags?limit=${count}&offset=${offset}`,
			)
		const { items, ...other } = responseData
		return {
			FFs: items.map(
				({
					featureFlag: { nodeId, ...featureFlag },
					belongsToNode: belongsToNode,
				}) => ({
					...featureFlag,
					departmentId: nodeId,
					departmentName: belongsToNode.name,
				}),
			),
			...other,
		}
	},

	// Получаем фича флаги по отделам
	getFFsByDepartments: async (
		departmentIds: number[],
		organisationId: number,
		count: number,
		offset: number,
	): Promise<{ FFs: IFeatureFlag[]; isEnd: boolean }> => {
		const FFs: IFeatureFlag[] = []
		let numberDepartment = departmentIds.length
		let isEnd = false

		while (count > 0 && numberDepartment > 0) {
			// запрашиваем у каждого отдела потихоньку пока не закончатся
			--numberDepartment
			try {
				const response = await FFApi.getFeatureFlagsByDepartment(
					departmentIds[numberDepartment],
					organisationId,
					count,
					offset,
				)
				count -= response.total
				FFs.push(...response.FFs)
			} catch {
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
		organisationId: number,
	): Promise<IFeatureFlag[]> => {
		const responseData =
			await APIJsonRequest<IFFByDepartmentLinkedResponse>(
				`${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/linked?limit=100&offset=0&relation=descendant`,
			)
		return responseData.items.map(
			({
				featureFlag: { nodeId, ...featureFlag },
				belongsToNode: belongsToNode,
			}) => ({
				...featureFlag,
				departmentId: nodeId,
				departmentName: belongsToNode.name,
			}),
		)
	},

	getFFsByDepsAndTheyChildren: async (
		departmentIds: number[],
		organisationId: number,
	): Promise<IFeatureFlag[]> => {
		const response = await Promise.all(
			departmentIds.map((departmentId) =>
				FFApi.getFFsByDepAndItsChildren(departmentId, organisationId),
			),
		)

		return response.reduce((allDepartments, departments) => {
			return [...departments, ...allDepartments]
		}, [])
	},

	switchFeatureFlags: async (
		organisationId: number,
		departmentId: number,
		featureFlagId: number,
		isEnabled: boolean,
	): Promise<void> => {
		const resp = APIJsonRequest<IFeatureFlag[]>(
			`${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/${featureFlagId}`,
			{ body: JSON.stringify({ value: isEnabled, version: 1 }) },
		)
	},

	removeFF: async (
		organisationId: number,
		departmentId: number,
		featureFlagId: number,
	) => {
		const resp = APIJsonRequest(
			`${URL_ORGANISATION}/${organisationId}/nodes/${departmentId}/feature-flags/${featureFlagId}`,
			{ method: "DELETE" },
		)
	},

	createFF: async (
		organisationId: number,
		nodeId: number,
		ff: Pick<IFeatureFlag, "name" | "value">,
	): Promise<IFeatureFlag> => {
		return APIJsonRequest<IFeatureFlag>(
			`${URL_ORGANISATION}/${organisationId}/nodes/${nodeId}/feature-flags`,
			{
				method: "POST",
				body: JSON.stringify({
					name: ff.name,
					isService: ff.value,
					parentId: nodeId,
				}),
			},
		)
	},
}

export default FFApi
