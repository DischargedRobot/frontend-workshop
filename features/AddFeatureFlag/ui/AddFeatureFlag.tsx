import "./AddFeatureFlag.scss"

import { PlusCircleOutlined } from "@ant-design/icons"
import { AddButton, TextInput } from "@/shared/ui"
import { Button } from "antd"
import { useAddFeatureFlag } from "../model"

export const AddFeatureFlag = () => {
	const { onSubmit, errors, register, isVisible, setIsVisible } =
		useAddFeatureFlag()

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
						<TextInput
							name="value"
							register={register}
							type="checkbox"
							label="Включён"
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
