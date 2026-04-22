import { ConfigProvider, Layout, ThemeConfig } from "antd"
import "./main.scss"
import "./MainLayout.scss"
// import style from './main.scss'
// import
import type { Metadata } from "next"
import Toasts from "@/shared/ui/Toast/Toasts"

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



// main: "#0b57d0",
// secondary: "#323234",
// text: "#e3e3e3",
// background: "#2a2828",


// main: "#0b57d0",
// secondary: "#141313",
// text: "#d2d2d2",
// textActive: "#d0d0d0",
// background: "#303032",

const COLOR = {
	backgroundTextColor: "#cfcfcf",
	foreground: "#989299",
	buttonBaseBackground: "#8d8d8d",
	hover: "#4d4d4d",
	hoverActive: "#507fdc",
	activeBackground: "#2a5cd0",
	// activeHover: "",
	activeBorder: "#ECECEC",
	foregroundSecond: "#292929cb",
	strokeNavPanel: "#111111e8",

	// MAIN PALETTE
	main: "#3871cc",
	secondary: "#2c2b2b",
	text: "#d2d2d2",
	textActive: "#d0d0d0",
	background: "#323233",

	// helper colors
	disabled: "#6d6a6a79",
	hoverMix: "#fefefe", // для ховеров пока не актиных
	hoverMixActive: "#2a2828b3", // для ховеров активных элементов
	selectedMix: "#555353", // для выделения выбранного элемента
	selectedMixHover: "#d8d8d873",
	activeMix: "#453e3eb8", // для кнопок и активных элементов
	strokeMix: "#b6b6b64b",

	switchBgActive: "#2a2828", // пока не надо

	// CHEKBOX 
	checkboxBg: "color-mix(in srgb, var(--secondary-color), var(--hover-mix) 22%)",

	modalBg: "color-mix(in srgb, var(--secondary-color), #000000 7%)",

	// USER CARD
	usercardBg: "var(--menu-bg)",
	usercardBgSelected: "color-mix(in srgb, var(--user-card-bg), var(--selected-mix) 40%)",
	usercardBgSelectedHover: "color-mix(in srgb, var(--user-card-bg), var(--selected-mix-hover) 60%)",

	// POPOVER
	popoverBg: "color-mix(in srgb, var(--secondary-color), #000000 7%)",

	// TABLE
	tableBg: "color-mix(in srgb, var(--background-color), #7575758b 50%)",
	tableHeaderBg: "color-mix(in srgb, var(--background-color), #7474749f 50%)",
	tableRowHoverBg: "color-mix(in srgb, var(--background-color), var(--hover-mix) 20%)",
	tableRowSelectedBg: "color-mix(in srgb, var(--background-color), var(--selected-mix) 40%)",
	tableRowSelectedHoverBg: "color-mix(in srgb, var(--background-color), var(--selected-mix-hover) 60%)",
	tableBorder: "color-mix(in srgb, var(--secondary-color), var(--stroke-mix) 70%)",

	// DEPARTMENT TREE
	departmenttreepanelBg: "color-mix(in srgb, var(--secondary-color), #6666669f 30%)",

	// ICON BUTTON
	iconSvg: "color-mix(in srgb, var(--text-color), var(--active-mix) 40%)",

	iconbuttonBg: "color-mix(in hsl, var(--background-color), var(--active-mix) 32%)",
	iconbuttonBgHover: "color-mix(in srgb, var(--background-color), var(--hover-mix) 70%)",
	iconbuttonBgDisabled: "color-mix(in srgb, var(--background-color), var(--disabled) 40%)",

	// INPUT
	inputBg: "color-mix(in srgb, var(--background-color), var(--hover-mix) 42%)",
	inputBgActive: "color-mix(in srgb, var(--background-color), var(--active-mix) 60%)",

	inputBorder: "color-mix(in srgb, var(--text-color), var(--stroke-mix) 90%)",
	inputBorderHover: "color-mix(in srgb, var(--main-color), var(--hover-mix) 7%)",
	inputBorderActive: "color-mix(in srgb, var(--main-color), var(--active-mix) 40%)",

	// MENU
	menuBg: "color-mix(in srgb, var(--secondary-color), var(--selected-mix) 12%)",

	menuItemHoverBg: "color-mix(in srgb, var(--main-color), var(--hover-mix) 22%)",

	menuItemActiveBg: "color-mix(in srgb, var(--main-color) , var(--hover-mix-active) 20%)",

	menuItemSelectedBg: "color-mix(in srgb, var(--main-color), var(--selected-mix) 20%)",

	menuItemColor: "#ffffff",
	menuItemSelectedColor: "var(--text-active-color)",
	// menuItemDisabledColor:
	// "color-mix(in srgb, var(--text-active-color), var(--disabled) 60%)",
	menuHover: "color-mix(in srgb, var(--main-color), var(--hover-mix) 42%)",

	// DESCTOP COLORS
	textDescription: "color-mix(in srgb, var(--text-color), var(--disabled) 30%)",
	textHover: "var(--text-color)", // пока не надо
	textDisabled: "color-mix(in srgb, var(--text-color), var(--disabled) 70%)",
	textPlaceholder: "color-mix(in srgb, var(--text-color), var(--disabled) 20%)",

	// BUTTON COLORS //
	formbuttonBg: "var(--main-color)",
	formbuttonBgActive: "color-mix(in srgb, var(--main-color) 85%, #2c2c2c 15%)",
	formbuttonBgHover: "color-mix(in srgb, var(--main-color) 100%, var(--hover-mix) 32%)",
	formbuttonBgDisabled: "color-mix(in srgb, var(--main-color), var(--disabled) 40%)",

	formbuttonText: "var(--text-color)",
	formbuttonTextActive: "var(--text-color)",
	formbuttonTextHover: "var(--text-color)",
}

export const metadata: Metadata = {
	title: "RedFlags",
}


const theme: ThemeConfig = {
	// zeroRuntime: true,
	token: {
		colorPrimary: COLOR.main,

		colorTextDescription: COLOR.textDescription,
		colorText: COLOR.textActive,
		colorTextLightSolid: COLOR.text,
		colorTextDisabled: COLOR.textDisabled,
		colorTextPlaceholder: COLOR.textPlaceholder,

		colorPrimaryBgHover: "#ffffff",

		colorBgBase: COLOR.menuBg,
		colorBgLayout: COLOR.background,
		// colorBorder: COLOR.stroke,
		colorPrimaryActive: COLOR.formbuttonBgActive,
		colorPrimaryBg: COLOR.secondary,

		colorBgContainerDisabled: COLOR.formbuttonBgDisabled,


		lineWidth: 2,

		// colorBgContainerDisabled: COLOR.formbuttonBgDisabled,
	},
	components: {
		Layout: {
			siderBg: COLOR.menuBg,
		},

		Input: {
			hoverBorderColor: COLOR.inputBorderHover,
			colorBgContainer: COLOR.inputBg,
			colorBorder: COLOR.inputBorder,

			activeBorderColor: COLOR.inputBorderHover,
			activeShadow: "0 0 0 2px rgba(11, 87, 208, 0.2)"
		},


		Button: {
			// BG
			defaultBg: COLOR.formbuttonBg,
			defaultHoverBg: COLOR.formbuttonBgHover,
			defaultActiveBg: COLOR.formbuttonBgActive,
			defaultBgDisabled: COLOR.formbuttonBgDisabled,

			// TEXT
			defaultHoverColor: COLOR.formbuttonTextHover,
			defaultActiveColor: COLOR.formbuttonTextActive,
			defaultColor: COLOR.formbuttonText,

			lineWidth: 0,

		},

		Table: {
			fontSize: FONTS.text.fontSize,
			cellPaddingBlockSM: 2,
			rowSelectedBg: COLOR.tableRowSelectedBg,
			rowSelectedHoverBg: COLOR.tableRowSelectedHoverBg,
			rowHoverBg: COLOR.tableRowHoverBg,
			colorBgContainer: COLOR.tableBg,
			borderColor: COLOR.tableBorder,
			headerBg: COLOR.tableHeaderBg,

			lineWidth: 0,
			// cellPaddingBlock: 8,
		},

		Pagination: {
			colorPrimary: COLOR.main,
			colorBgContainer: COLOR.tableBg,
			colorText: COLOR.text,
		},


		Tree: {
			colorBorder: COLOR.main, // цвет чекбокса и лиций
			colorBgContainer: "",
			directoryNodeSelectedColor: COLOR.activeBorder,
			directoryNodeSelectedBg: COLOR.activeBorder,

		},

		Popover: {
			colorBgContainer: COLOR.popoverBg,

			colorBgBase: COLOR.popoverBg,
		},

		Menu: {
			collapsedIconSize: 32, // почему-то нужно чтобы было в 2 раза больше иначе будет дёргаться размер
			collapsedWidth: 32,
			itemHeight: 48,

			horizontalItemSelectedBg: COLOR.menuItemSelectedBg,
			horizontalItemHoverBg: COLOR.menuHover,
			horizontalItemSelectedColor: COLOR.menuItemSelectedColor,

			itemSelectedBg: COLOR.menuItemSelectedBg,
			itemSelectedColor: COLOR.menuItemSelectedColor,
			itemBg: COLOR.menuBg,
			itemActiveBg: COLOR.menuItemActiveBg,
			itemHoverBg: COLOR.menuItemHoverBg,
			itemColor: COLOR.menuItemColor,
			// activeBarWidth: 10,
			activeBarWidth: 0,

		},

		Breadcrumb: {
			lastItemColor: COLOR.main,
			fontSize: FONTS.text.fontSize,
			lineHeight: 1,
			fontFamily: FONTS.text.fontFamily,

			separatorColor: COLOR.strokeMix,
		},

		Modal: {
			contentBg: COLOR.modalBg,
			borderRadius: 8,
			// colorText: COLOR.text,
			// colorTextHeading: COLOR.text,
			// colorTextDescription: COLOR.textDescription,
		},

		Checkbox: {
			colorPrimary: COLOR.main,       // checked
			colorBgContainer: COLOR.checkboxBg,   // фон
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
						overflow: "auto",
						"--main-color": COLOR.main,
						"--secondary-color": COLOR.secondary,
						"--text-color": COLOR.text,
						"--text-active-color": COLOR.textActive,
						"--disabled": COLOR.disabled,

						// GENERAL
						"--foreground": COLOR.secondary,
						"--foreground-second": COLOR.secondary,
						"--background": COLOR.background,
						"--hover": COLOR.hover,
						"--hover-active-background": COLOR.hoverActive,
						"--border-for-nav-panel": COLOR.strokeNavPanel,

						// MIXES
						"--hover-mix": COLOR.hoverMix,
						"--hover-mix-active": COLOR.hoverMixActive,
						"--selected-mix": COLOR.selectedMix,
						"--active-mix": COLOR.activeMix,
						"--stroke-mix": COLOR.strokeMix,
						"--selected-mix-hover": COLOR.selectedMixHover,

						"--active-hover": COLOR.hoverActive,
						"--active-background": COLOR.activeBackground,


						// TEXT
						"--text-description": COLOR.textDescription,
						"--text-hover": COLOR.textHover,
						"--text-disabled": COLOR.textDisabled,
						"--text-placeholder": COLOR.textPlaceholder,

						// CHEKBOX
						"--checkbox-bg": COLOR.checkboxBg,

						// INPUT
						"--textinput-bg": COLOR.inputBg,
						"--textinput-bg-active": COLOR.inputBgActive,

						"--textinput-border": COLOR.inputBorder,
						"--textinput-border-active": COLOR.inputBorderActive,

						// MODAL
						"--modal-bg": COLOR.modalBg,

						// USER CARD
						"--user-card-bg": COLOR.usercardBg,

						// POPOVER
						"--popover-bg": COLOR.popoverBg,

						// TABLE
						"--table-bg": COLOR.tableBg,
						"--table-header-bg": COLOR.tableHeaderBg,
						"--table-row-hover-bg": COLOR.tableRowHoverBg,
						"--table-row-selected-bg": COLOR.tableRowSelectedBg,
						"--table-row-selected-hover-bg": COLOR.tableRowSelectedHoverBg,
						"--table-border": COLOR.tableBorder,

						// MENU
						"--menu-bg": COLOR.menuBg,
						"--menu-item-hover-bg": COLOR.menuItemHoverBg,
						"--menu-item-active-bg": COLOR.menuItemActiveBg,
						"--menu-item-selected-bg": COLOR.menuItemSelectedBg,
						"--menu-item-color": COLOR.menuItemColor,
						"--menu-item-selected-color": COLOR.menuItemSelectedColor,
						"--menu-hover": COLOR.menuHover,

						// ICON BUTTON
						"--iconbutton-bg": COLOR.iconbuttonBg,
						"--iconbutton-bg-hover": COLOR.iconbuttonBgHover,
						"--iconbutton-bg-disabled": COLOR.iconbuttonBgDisabled,

						// department tree
						"--department-tree-panel-bg": COLOR.departmenttreepanelBg,



						"--button-base-background": COLOR.buttonBaseBackground,
						"--background-text-color": COLOR.backgroundTextColor,

						// BUTTONS
						"--formbutton-bg": COLOR.formbuttonBg,
						"--formbutton-bg-active": COLOR.formbuttonBgActive,
						"--formbutton-bg-hover": COLOR.formbuttonBgHover,
						"--formbutton-bg-disabled": COLOR.formbuttonBgDisabled,

						"--formbutton-text": COLOR.formbuttonText,
						"--formbutton-text-active": COLOR.formbuttonTextActive,
						"--formbutton-text-hover": COLOR.formbuttonTextHover,
						"--input-bg": COLOR.inputBg,
						"--input-border": COLOR.inputBorder,

						"--error-message-color": "#ff4d4f",
						"--success-message-color": "#2abd53",
					} as React.CSSProperties
				}
			>
				{/* theme={theme} */}
				<ConfigProvider theme={theme}>
					<Layout hasSider className="body-layout" rootClassName="main-layout ">
						{children}
						<Toasts />
					</Layout>
				</ConfigProvider>
			</body>
		</html >
	)
}
