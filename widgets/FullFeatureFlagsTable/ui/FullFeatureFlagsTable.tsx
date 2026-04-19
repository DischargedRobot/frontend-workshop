"use client"

import "./FullFeatureFlagsTable.scss"

import { FFTable, useFilteredFFs } from "@/entities/FF"
import { AddFeatureFlag } from "@/features/AddFeatureFlag"
import FFSearch from "@/features/FFSearch/FFSearch"
import { FFTableFilters } from "@/features/FFTableFilters"
import { useFullFeatureFlagsTable } from "../model"
import { Can } from "@/shared/model/Ability"
import { ReloadFeatureFlags } from "@/features/ReloadFeatureFlags"

const FullFeatureFlagsTable = () => {
	const organization = useFullFeatureFlagsTable()

	const featureFlags = useFilteredFFs()

	return (
		<div className="full-feature-flags-table">
			<Can I="read" a="FF">
				<div className="full-feature-flags-table__toolbar">
					<FFTableFilters className="full-feature-flags-table__filters" />
					<FFSearch
						className="full-feature-flags-table__search"
					/>
					<div className="full-feature-flags-table__actions">
						<Can I="create" a="FF">
							<AddFeatureFlag organization={organization} />
						</Can>
						<Can I="read" a="FF">
							<ReloadFeatureFlags />
						</Can>
					</div>
				</div>
				<FFTable featureFlags={featureFlags} />
			</Can>
		</div>
	)
}

export default FullFeatureFlagsTable
