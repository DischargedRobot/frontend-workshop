import { create } from "zustand"

interface ITheme {
    activeColor: string
    textColor: string
    hoverColor: string
    strokeColor: string
}

interface IThemeStore {
    themes: ITheme[]
}

const useThemeStore = create<IThemeStore>((set, get) => ({
    themes: []
}))

export default useThemeStore