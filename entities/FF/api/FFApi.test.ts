import FFApi from "./FFApi"

describe("FFApi", () => {
	let organizationId: number
	let departmentId: number
	let featureFlagId: number
	let isEnabled: boolean
	beforeEach(() => {
		jest.clearAllMocks()
		organizationId = 1
		departmentId = 1
		featureFlagId = 1
		isEnabled = true
	})

	it("", async () => {
		jest.spyOn(FFApi, "switchFeatureFlags").mockResolvedValue()

		await expect(
			FFApi.switchFeatureFlags(
				organizationId,
				departmentId,
				featureFlagId,
				isEnabled,
			),
		).resolves.toBeUndefined()
	})
})
