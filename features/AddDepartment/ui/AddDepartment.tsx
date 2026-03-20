'use client'
import { PlusCircleOutlined } from "@ant-design/icons"
import "./AddDepartment.scss"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button, Form, Input } from "antd"
import useDepartmentsStore from "@/entities/Departments/model/useDepartmentsStore"
import { departmentApi } from "@/entities/Departments"
import useOrganisationStore from "@/entities/Organisation/model/useOrganisationStore"

interface AddDepartmentForm {
    nameDepartment: string,

}

const AddDepartment = () => {
    
    const addDepart = useDepartmentsStore(state => state.addDepartment)

    const organisationId = useOrganisationStore(state => state.organisation.id)
    const selectedDepartmentIds = useDepartmentsStore(state => state.selectedDepartmentIds)
    const addDepartment = async (date: AddDepartmentForm) => {
        // const response = await fetch('', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     // body: JSON.stringify(data)
        // })
        if (selectedDepartmentIds.at(-1) != undefined)
        {
            departmentApi.addDepartment(date.nameDepartment, organisationId, selectedDepartmentIds.at(-1)!)
            addDepart({id: 10, name: date.nameDepartment, children: [], featureFlags: [], link: '', isService: false, version: 1})
        }
    }

    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<AddDepartmentForm>()
    const [isCollapsed, setIsCollapsed] = useState(true)

    return (
        <div
            className="add-department" 
        >
            <button
                className="add-department__button"
                onClick={() => {setIsCollapsed(prev => !prev)}}
            >
                <PlusCircleOutlined/>
            </button>
            <Form 
                className={`add-department__panel ${isCollapsed ? 'add-department__panel_collapsed' : ''}`}
                onFinish={handleSubmit(addDepartment)}
            >
                <Form.Item
                    className="add-department__field"
                    validateStatus={errors.nameDepartment ? 'error' : ''}
                    help={errors.nameDepartment ? errors.nameDepartment.message : ''}
                >
                    <Controller
                        control={control}
                        name="nameDepartment"
                        rules={{
                            required: "Введите название отдела"
                        }}
                        render={({field}) => <Input placeholder="Название отдела" {...field}/>}
                    />
                </Form.Item>
                <Button htmlType='submit'>
                    Создать
                </Button>
            </Form>
        </div>
        
        
    )
}

export default AddDepartment