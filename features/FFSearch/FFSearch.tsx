'use client'
import { GetProps, Input } from "antd"

const { Search } = Input

type SearchProps = GetProps<typeof Input.Search>

// TODO:: заглушка
const onSearch: SearchProps['onSearch'] = (value, _, info) => {console.log(info?.source, value)}

const FilteredByStringParam = <T, K extends keyof T>(regular: string, data: T[], field: K): T[] => {
    return data.filter(item => {
        if (typeof item[field] === 'string')
        {
            if (item[field].includes(regular)){
                return item
            }
        }
    })
}

const FFSearch = ({ onSearch }: { onSearch?: SearchProps['onSearch'] }) => {
    return (
        <Search enterButton onSearch={onSearch} placeholder="Имя фич флага"/>
    )
}

export default FFSearch