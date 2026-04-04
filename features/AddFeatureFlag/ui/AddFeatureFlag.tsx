import "./AddFeatureFlag.scss"

import { AddButton, TextInput } from "@/shared/ui"
import { Button, Switch } from "antd"
import { useAddFeatureFlag } from "../model"
import { Controller } from "react-hook-form"

type Props = {
	organisationId: number
	nodeId: number
}

export const AddFeatureFlag = ({ organisationId, nodeId }: Props) => {
	const { onSubmit, errors, register, isVisible, setIsVisible, control } =
		useAddFeatureFlag(organisationId, nodeId)

	return (
		<div className="add-feature-flag">
			<AddButton
				text="Добавить"
				onClick={() => setIsVisible((v) => !v)}
			/>
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
					<Button type="primary" htmlType="submit">
						Добавить
					</Button>
				</form>
			)}
		</div>
	)
}
