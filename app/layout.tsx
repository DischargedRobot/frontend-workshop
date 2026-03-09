import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import './main.scss';
// import style from './main.scss'
// import 
import type { Metadata } from "next";

// import { SessionProvider } from "next-auth/react";
const FONTS = {
  text: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  bigText: {
    fontSize: 20,
    fontFamily: 'Roboto',
  }
}

const COLOR = {
  textColor: "#e8e8e8",
  backgroundTextColor: "#cfcfcf",
  background: "#2A2828",
  foreground: "#323234",
  hover: "#4d4d4d",
  activeBackground: "#2d75c8",
  stroke: "#544F4F",
  activeBorder: "#ECECEC",
}


export const metadata: Metadata = {
  title: "Registration",
};

// TODO: вот так для всех сделать
const layout = {
  siderBg: COLOR.foreground,
}

const theme: ThemeConfig = {
  token: {
    colorText: COLOR.textColor,
    colorBgBase: COLOR.foreground,
    colorBgLayout: COLOR.background,
    colorBorder: COLOR.stroke,

    colorTextPlaceholder: '#d2d2d2',
  },
  components: {
    
    Layout: {
      ...layout
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

      separatorColor: COLOR.stroke
      // itemColor: COLOR.backgroundTextColor,

      
      // colorLinkHover: COLOR.activeBackground,
      // colorInfoTextHover: COLOR.activeBackground,
      // linkHoverColor: COLOR.activeBackground
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* theme={theme} */}
        <ConfigProvider theme={theme}>
            <Layout hasSider className='body-layout'>
              {children}
            </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
