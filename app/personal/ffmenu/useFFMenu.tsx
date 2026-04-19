import { create } from "zustand"

interface IUseFFMenu {
	isHidden: boolean
	setIsHidden: (isHidden: boolean) => void
}

export const useFFMenu = create<IUseFFMenu>((set) => ({
	isHidden: false,
	setIsHidden: (value) => set({ isHidden: !value }),
}))
