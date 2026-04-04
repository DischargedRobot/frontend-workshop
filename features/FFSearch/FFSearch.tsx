"use client"
import useFFFiltersStore from "@/entities/FFT/model/useFFFiltersStore"
import { GetProps, Input } from "antd"
import React from "react"

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>

// TODO:: заглушка
const onSearch: SearchProps["onSearch"] = (value, _, info) => {
	console.log(info?.source, value)
}

const FFSearch = ({
	onSearch,
}: {
	onSearch?: React.ChangeEventHandler<HTMLInputElement>
}) => {
	const setFeatureFlagName = useFFFiltersStore((state) => state.setName)

	return (
		<Search
			type={"search"}
			enterButton
			onChange={(e) => setFeatureFlagName(e.target.value)}
			placeholder="Имя фич флага"
		/>
	)
}

export default FFSearch
