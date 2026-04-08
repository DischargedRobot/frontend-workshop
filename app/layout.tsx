import { ConfigProvider, Layout, ThemeConfig } from "antd"
import "./main.scss"
// import style from './main.scss'
// import
import type { Metadata } from "next"
import Toasts from "@/shared/ui/Toast/Toasts"

// import { SessionProvider } from "next-auth/react";
const FONTS = {
	text: {
		fontSize: 16,
		fontFamily: "Roboto",
	},
	bigText: {
		fontSize: 20,
		fontFamily: "Roboto",
	},
}

const COLOR = {
	textColor: "#e3e3e3",
	backgroundTextColor: "#cfcfcf",
	background: "#313131",
	foreground: "#222222",
	buttonBaseBackground: "#8d8d8d",
	hover: "#4d4d4d",
	hoverActive: "#507fdc",
	activeBackground: "#2a5cd0",
	// activeHover: "",
	stroke: "#58595d76",
	activeBorder: "#ECECEC",
	foregroundSecond: "#292929cb",
	strokeNavPanel: "#111111e8",

	// colorPrimary: '#2a5dd2'
}

export const metadata: Metadata = {
	title: "Registration",
}

// TODO: вот так для всех сделать
const layout = {
	siderBg: COLOR.foreground,
}

const theme: ThemeConfig = {
	token: {
		colorPrimary: COLOR.activeBackground,
		colorText: COLOR.textColor,
		colorBgBase: COLOR.foreground,
		colorBgLayout: COLOR.background,
		colorBorder: COLOR.stroke,
		colorTextPlaceholder: "#d2d2d2",
		colorPrimaryActive: COLOR.activeBackground,
		colorPrimaryBg: COLOR.foregroundSecond,
	},
	components: {
		Layout: {
			...layout,
		},

		Button: {
			colorBgContainer: COLOR.activeBackground,
			colorBorder: COLOR.activeBorder,
		},

		Table: {
			fontSize: FONTS.text.fontSize,
			cellPaddingBlockSM: 2,
			rowSelectedBg: COLOR.foreground,
			rowSelectedHoverBg: COLOR.hover,
			rowHoverBg: COLOR.hover,
			colorBgContainer: COLOR.background,
			borderColor: COLOR.stroke,
			// cellPaddingBlock: 8,
		},

		Tree: {
			colorBgContainer: "",
		},

		Menu: {
			collapsedIconSize: 32, // почему-то нужно чтобы было в 2 раза больше иначе будет дёргаться размер
			collapsedWidth: 32,
			itemHeight: 48,
			itemSelectedBg: COLOR.activeBackground,
			itemSelectedColor: COLOR.textColor,
			itemBg: COLOR.foreground,
			itemHoverBg: COLOR.hover,
		},

		Breadcrumb: {
			lastItemColor: COLOR.activeBackground,
			fontSize: FONTS.text.fontSize,
			lineHeight: 1,
			fontFamily: FONTS.text.fontFamily,

			separatorColor: COLOR.stroke,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				style={
					{
						"--text-color": COLOR.textColor,
						"--active-hover": COLOR.hoverActive,
						"--active-background": COLOR.activeBackground,
						"--foreground": COLOR.foreground,
						"--foreground-second": COLOR.foregroundSecond,
						"--background": COLOR.background,
						"--hover": COLOR.hover,
						"--hover-active-background": COLOR.hoverActive,
						"--border-for-nav-panel": COLOR.strokeNavPanel,
					} as React.CSSProperties
				}
			>
				{/* theme={theme} */}
				<ConfigProvider theme={theme}>
					<Layout hasSider className="body-layout">
						{children}
						<Toasts />
					</Layout>
				</ConfigProvider>
			</body>
		</html>
	)
}
