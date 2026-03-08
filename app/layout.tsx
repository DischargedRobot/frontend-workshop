import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import './main.scss';
// import style from './main.scss'
// import 
import type { Metadata } from "next";
import { Content } from 'antd/es/layout/layout';

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
  backgroundTextColor: "#d4d4d4",
  background: "#2A2828",
  textColor: "#ECECEC",
  foreground: "#323234",
  activeBackground: "#2d75c8",
  stroke: "#544F4F",
  activeBorder: "#ECECEC",
}


export const metadata: Metadata = {
  title: "Registration",
};

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
      siderBg: COLOR.foreground,
    },
    Button: {
      colorBgContainer: COLOR.activeBackground,
      colorBorder: COLOR.activeBorder,
    },
    Table: {
      cellPaddingBlockSM: 2,
      // cellPaddingBlock: 8,
    },
    Menu: {
      collapsedIconSize: 64,
      // collapsedWidth: 100, 
      itemHeight: 64,
      itemSelectedBg: COLOR.background,
      itemBg: COLOR.foreground
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
    }
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
