"use client"

import { FFTable, useFilteredFFs } from "@/entities/FF"
import { AddFeatureFlag } from "@/features/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { FFTableFilters } from "@/features/FFTableFilters"
import { Flex } from "antd"
import { useFullFeatureFlagsTable } from "../model"
import { Can } from "@/shared/model/Ability"

const FullFeatureFlagsTable = () => {
	const { organization, setFeatureFlagName, reloadFeatureFlags } =
		useFullFeatureFlagsTable()

	const featureFlags = useFilteredFFs()

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<Can I="read" a="FF">
				<Flex align="center" gap={30}>
					<FFTableFilters />
					<FFSearch
						onSearch={(e) => setFeatureFlagName(e.target.value)}
					/>
					<Can I="create" a="FF">
						<AddFeatureFlag organization={organization} />
					</Can>
					<ReloadFeaturesFlags onClick={reloadFeatureFlags} />
				</Flex>
				<FFTable featureFlags={featureFlags} />
			</Can>
		</div>
	)
}

export default FullFeatureFlagsTable
