import { IDepartment } from "../lib/DepartmentType"
import APIJsonRequest from "@/shared/api/APIJsonRequest"
import { isAPIError, mapAPIErrors } from "@/shared/api/APIErrors"
import { IOrganization } from "@/entities/Organization"
import { IService, IServiceDepartment } from "../lib"

const URL_ORGANIZATION = process.env.NEXT_PUBLIC_API_ORGANIZATIONS_URL_V1
export interface IDepartmentResponse {
	id: number
	organizationId: number
	uuid: string
	path: string
	name: string
	isService: false
	version: number
}

interface IDepartmentsByOrganizationId {
	items: IDepartmentResponse[]
	limit: number
	offset: number
	total: number
}

const convertIDepartmentResponseToIDepartmentWithOrganization = (
	departmentsResponse: IDepartmentResponse[],
	organization: IOrganization,
): IDepartment[] => {
	// Мапим, чтобы потом было проще обратиться к узлу во время операций, а не писать find
	const nodeMap = new Map<number, IDepartment>()

	// Обрабатываем вход в map
	departmentsResponse.forEach((depResp) => {
		nodeMap.set(depResp.id, {
			...depResp,
			children: [],
			featureFlags: [],
		})
	})

	// Тут мы закидывает департаменты в детей других узлов
	const nodes: IDepartment[] = []
	// console.log(organization, 'org')
	departmentsResponse.forEach((item) => {
		const path = item.path.split(".")
		//TODO поменять условия местави, т.к. так будет быстрее
		// тут не может быть undefined, толькое если бекенд накосячил накосячил...
		if (path.length <= 2) {
			if (path.length == 2) {
				const node = nodeMap.get(parseInt(path[1]))!
				organization.child.children.push(node)
				nodes.push(node)
			} else {
				organization.child = nodeMap.get(parseInt(path[0]))!
			}
		}
		// условиие обхода корневого, т.к. у него длина 1
		else if (path.length > 2) {
			nodeMap
				.get(parseInt(path.at(-2)!))
				?.children.push(nodeMap.get(item.id)!)
		}
	})

	return nodes
}

// Собираем ответ в родительский отдел
const reduceDepRespToParentDep = (
	departmentsResponse: IDepartmentResponse[],
	parentDepartment: IDepartment,
): IDepartment[] => {
	// Мапим, чтобы потом было проще обратиться к узлу во время операций, а не писать find
	const nodeMap = new Map<number, IDepartment>()

	departmentsResponse.forEach((depResp) => {
		nodeMap.set(depResp.id, {
			...depResp,
			children: [],
			featureFlags: [],
		})
	})

	parentDepartment.children = []

	departmentsResponse.forEach((depResp) => {
		const path = depResp.path.split(".").map((item) => parseInt(item))
		// Если нету пути, то корявые данные
		if (path.at(-1) === undefined) {
			throw mapAPIErrors(500)
		} else {
			// Второй с конца - родитель, если наш, то кидаем
			if (path.at(-2) === parentDepartment.id) {
				parentDepartment.children.push(nodeMap.get(depResp.id)!)
			} else {
				nodeMap
					.get(path.at(-2)!)!
					.children.push(nodeMap.get(depResp.id)!)
			}
		}
	})

	return parentDepartment.children
}

/** @desc Собираем ответ в массив, в массиве остаются только первые потомки, к остальным нужно
 * обращаться через элементы массива!! на входе не должно быть в списке родительского узла **/
const reduceDepRespToArray = (
	departmentsResponse: IDepartmentResponse[],
): IDepartment[] => {
	// Мапим, чтобы потом было проще обратиться к узлу во время операций, а не писать find
	const nodeMap = new Map<number, IDepartment>()

	departmentsResponse.forEach((depResp) => {
		nodeMap.set(depResp.id, {
			...depResp,
			children: [],
			featureFlags: [],
		})
	})

	const children: IDepartment[] = []

	departmentsResponse.forEach((depResp) => {
		const path = depResp.path.split(".").map((item) => parseInt(item))
		// Если нету пути, то корявые данные
		if (path.at(-1) === undefined) {
			throw mapAPIErrors(500)
		} else {
			// Второй с конца - родитель, если наш, то кидаем
			if (
				path.at(-2) !== undefined &&
				nodeMap.get(path.at(-2)!) === undefined
			) {
				children.push(nodeMap.get(depResp.id)!)
			} else {
				nodeMap
					.get(path.at(-2)!)!
					.children.push(nodeMap.get(depResp.id)!)
			}
		}
	})

	return children
}

function convertIDepartmentResponseToIDepartment(
	departmentResponse: IDepartmentResponse,
): IDepartment
function convertIDepartmentResponseToIDepartment(
	departmentsResponse: IDepartmentResponse[],
): IDepartment[]

function convertIDepartmentResponseToIDepartment(
	departmentsResponse: IDepartmentResponse | IDepartmentResponse[],
): IDepartment | IDepartment[] {
	// Если передан массив
	if (Array.isArray(departmentsResponse)) {
		return departmentsResponse.map((depResp) => ({
			...depResp,
			children: [],
			featureFlags: [],
		}))
	}

	// Если передан один объект
	return {
		...departmentsResponse,
		children: [],
		featureFlags: [],
	}
}

interface IServiceResponse extends IService, IDepartmentResponse {}

/** @desc Конвертер из ответа сервиса в тип IServiceDepartment*/
const convertIServiceResponseToIServiceDepartment = (
	serviceResponse: IServiceResponse,
): IServiceDepartment => ({
	...serviceResponse,
	children: [],
	featureFlags: [],
})

const departmentApi = {
	getDepartmentsByOrganization: async (
		organization: IOrganization,
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${URL_ORGANIZATION}/${organization.id}/nodes?limit=42&offset=0`,
		)

		return convertIDepartmentResponseToIDepartmentWithOrganization(
			responseData.items,
			organization,
		)
	},

	// *** Для детей ***
	/** @desciption Возвращает детей отдела **/
	getChildrenOfDepartments: async (
		organizationId: number,
		departmentId: number,
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/children`,
		)
		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return convertIDepartmentResponseToIDepartment(
			responseData.items.filter((dep) => dep.id != departmentId),
		)
	},

	/** @desciption Возвращает первых детей, запрашивает потомков и потомков потомков **/
	getDescedantOfDepartments: async (
		organizationId: number,
		departmentId: number,
		depthLevel: number | "" = "",
	): Promise<IDepartment[]> => {
		const responseData = await APIJsonRequest<IDepartmentsByOrganizationId>(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}/descendants?depth=${depthLevel}`,
		)
		console.log("getDescedantOfDepartments :", responseData)
		// convertIDepartmentResponseToIDepartment(responseData.items.filter((dep) => dep.id != departmentId))
		// reduceDepartmentResponceToParentDepartment(responseData.items.filter((dep) => dep.id != department.id), department)
		return reduceDepRespToArray(
			responseData.items.filter((dep) => dep.id != departmentId),
		)
	},

	// getDepartmentsByPath: async (path: string): Promise<IDepartment[]> => {
	// 	return await APIJsonRequest<IDepartment[]>(`${path}`)
	// },

	addDepartment: async (
		departmentName: string,
		organizationId: number,
		parentId: number,
	): Promise<IDepartment> => {
		const respDep = await APIJsonRequest<IDepartmentResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes`,
			{
				method: "POST",
				body: JSON.stringify({
					name: departmentName,
					isService: false,
					parentId,
				}),
			},
		)
		return convertIDepartmentResponseToIDepartment(respDep)
	},

	addService: async (
		departmentName: string,
		organizationId: number,
		parentId: number,
	): Promise<IServiceDepartment> => {
		const response = await APIJsonRequest<IServiceResponse>(
			`${URL_ORGANIZATION}/${organizationId}/nodes`,
			{
				method: "POST",
				body: JSON.stringify({
					name: departmentName,
					isService: true,
					parentId,
				}),
			},
		)

		return convertIServiceResponseToIServiceDepartment(response)
	},

	/**
	 *
	 * @param organizationId айди организации, в которой нужно удалить департамент
	 * @param departmentId айди департамента, который нужно удалить
	 * @returns
	 */
	removeDepartmentById: async (
		organizationId: number,
		departmentId: number,
	) => {
		try {
			await APIJsonRequest(
				`${URL_ORGANIZATION}/${organizationId}/nodes/${departmentId}`,
				{ method: "DELETE" },
			)
			console.log("всё хорошо")
		} catch (error: unknown) {
			if (isAPIError(error)) {
				switch (error.status) {
					case 401: {
						console.log(error.message)
						return
					}
				}
			}
		}
	},

	removeDepartmentsByIds: async (
		organizationId: number,
		departmentIds: number[],
	) => {
		await Promise.all(
			departmentIds.map((departmentId) => {
				departmentApi.removeDepartmentById(organizationId, departmentId)
			}),
		)
	},

	changeDepartmentName: async (
		newDepartment: IDepartment,
		organizationId: number,
	): Promise<void> => {
		await APIJsonRequest(
			`${URL_ORGANIZATION}/${organizationId}/nodes/${newDepartment.id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					name: `${newDepartment.name}`,
					isService: newDepartment.isService,
					version: newDepartment.version,
				}),
			},
		)

		newDepartment.version++
	},
}

export default departmentApi
