"use client"

import "./AddFeatureFlag.scss"

import { AddButton, TextInput } from "@/shared/ui"
import { Button, Switch } from "antd"
import { Controller } from "react-hook-form"
import { SearchDropDownMenu } from "@/shared/model/SearchDropMenu"
import { IDepartment } from "@/entities/Departments"
import { IOrganisation } from "@/entities/Organisation/model/useOrganisationStore"
import { useAddFeatureFlag } from "../model/useAddFeatureFlag"

type Props = {
	organisation: IOrganisation
}

export const AddFeatureFlag = ({ organisation }: Props) => {
	const {
		onSubmit,
		errors,
		register,
		isVisible,
		setIsVisible,
		control,
		resetForm,
		resetKey,
		defaultDep,
		departmentOptions,
		handleSelectDepartment,
	} = useAddFeatureFlag(organisation)

	return (
		<div className="add-feature-flag">
			<AddButton onClick={() => setIsVisible((v) => !v)}>
				Добавить
			</AddButton>
			{isVisible && (
				<form
					className="add-feature-flag__feature-flag-form feature-flag-form"
					onSubmit={onSubmit}
				>
					<div className="feature-flag-form__data">
						<TextInput
							className={"text_litle "}
							placeholder="Имя фич флага"
							name="name"
							rules={{
								minLength: {
									value: 1,
									message:
										"Длина имени фич флага должно быть больше 1",
								},
							}}
							register={register}
							error={errors?.name?.message}
						/>
						<Controller
							name="value"
							control={control}
							render={({ field }) => <Switch {...field} />}
						/>
					</div>
					<Controller
						control={control}
						name="departmentId"
						render={({ field }) => (
							<SearchDropDownMenu<IDepartment>
								key={resetKey}
								{...field}
								placeholder="Отдел"
								defaultValue={defaultDep}
								onSelect={(dep) => {
									const selected = handleSelectDepartment(dep)
									if (selected) field.onChange(selected.id)
								}}
								options={departmentOptions}
							/>
						)}
					/>

					<Button type="primary" htmlType="submit">
						Добавить
					</Button>
					<Button type="primary" onClick={() => resetForm()}>
						Сброс
					</Button>
				</form>
			)}
		</div>
	)
}
