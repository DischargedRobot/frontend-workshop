import { Slider } from "antd"

const TextSizeSettings = () => {
	return (
		<div>
			<h5>Масштаб текста: 100%</h5>
			<Slider min={0} max={200} />
		</div>
	)
}

export default TextSizeSettings
