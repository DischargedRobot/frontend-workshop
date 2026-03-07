const useDepartment = () => {
    async function getDepartmentsByPath(path: string) {
        const response = await fetch(`${path}`,{
            method: 'GET',
            headers: {'Content-type': 'aplication/json'},
        })

        return await response.json()
    }

    return {
        getDepartmentsByPath
    }
}