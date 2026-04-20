import { useCallback } from "react"
import "./ReloadFeaturesFlags.scss"

import { ReloadButton } from "@/shared/ui"
import { useOrganizationStore } from "@/entities/Organization"
import { useBreadcrumbStore } from "@/entities/DepartmentBreadcamb"
import { useShallow } from "zustand/shallow"
import { FFApi, useFFStore } from "@/entities/FF"

interface Props {
    onClick?: () => void
}

const ReloadFeatureFlags = ({ onClick }: Props) => {
    const organization = useOrganizationStore((state) => state.organization)

    // Последний депаратмент в хлебных крошках
    // Всегда есть (самый первый - узел органзиации)
    const lastDep = useBreadcrumbStore(
        useShallow((state) => state.getLastDepartment() ?? organization.child),
    )

    const setFeatureFlag = useFFStore((state) => state.setFeatureFlags)


    // Событие для кнопки "обновить"
    const reloadFeatureFlags = useCallback(async () => {
        console.log("reload feature flags", lastDep)
        const response = await FFApi.getFFsByDepartments(
            lastDep.children,
            organization.id,
            100,
            0,
        )
        setFeatureFlag(response.FFs)
    }, [lastDep, organization, setFeatureFlag])

    return <ReloadButton onClick={reloadFeatureFlags} />
}

export default ReloadFeatureFlags
