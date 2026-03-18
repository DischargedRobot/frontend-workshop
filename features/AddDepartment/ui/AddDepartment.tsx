'use client'
import { PlusCircleOutlined } from "@ant-design/icons"
import "./AddDepartment.scss"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button, Form, Input } from "antd"

interface AddDepartmentForm {
    nameDepartment: string,

}

const AddDepartment = () => {
    
    const addDepartment = async () => {
        const response = await fetch('', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify(data)
        })
    }

    const {
        handleSubmit,
        register,
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
                onFinish={handleSubmit}
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