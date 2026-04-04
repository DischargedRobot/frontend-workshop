"use client"

import { FFTable, useFilteredFFs } from "@/entities/FF"
import { AddFeatureFlag } from "@/features/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import ReloadFeaturesFlags from "@/features/ReloadFeatureFlags/ReloadFeaturesFlags"
import { FFTableFilters } from "@/features/FFTableFilters"
import { Flex } from "antd"
import { useFullFeatureFlagsTable } from "../model"

const FullFeatureFlagsTable = () => {
	const {
		lastDepInBredcrumb,
		organisationId,
		setFeatureFlagName,
		reloadFeatureFlags,
	} = useFullFeatureFlagsTable()

	const featureFlags = useFilteredFFs()

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
			<Flex align="center" gap={30}>
				<FFTableFilters />
				<FFSearch
					onSearch={(e) => setFeatureFlagName(e.target.value)}
				/>
				<AddFeatureFlag
					organisationId={organisationId}
					nodeId={lastDepInBredcrumb}
				/>
				<ReloadFeaturesFlags onClick={reloadFeatureFlags} />
			</Flex>
			<FFTable featureFlags={featureFlags} />
		</div>
	)
}

export default FullFeatureFlagsTable
