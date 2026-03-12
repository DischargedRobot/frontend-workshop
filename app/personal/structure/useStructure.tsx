import { IUser } from "@/entities/UserCard/types";
import { set } from "react-hook-form";
import { create } from "zustand";


interface IUseStructure {
    users: IUser[]
    setUsers: (users: IUser[]) => void
}

const useStructure = create<IUseStructure>((set, get) => ({

    users: [],
    setUsers: (items) => set({users: items}),

}))