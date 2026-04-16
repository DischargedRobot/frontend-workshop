import "./ReloadFeaturesFlags.scss"

import { ReloadButton } from "@/shared/ui"

interface Props {
    onClick: () => void
}

const ReloadFeatureFlags = ({ onClick }: Props) => {
    return <ReloadButton onClick={onClick} />
}

export default ReloadFeatureFlags
