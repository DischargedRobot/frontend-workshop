import { ConfigProvider, Layout, ThemeConfig } from 'antd';
import './main.scss';
// import style from './main.scss'
// import 
import type { Metadata } from "next";
import { Content } from 'antd/es/layout/layout';

// import { SessionProvider } from "next-auth/react";
const COLOR = {
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
  },
  components: {
    Button: {
      colorBgContainer: COLOR.activeBackground,
      colorBorder: COLOR.activeBorder,
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
        <ConfigProvider theme={theme}>
            <Layout className='body-layout'>
              {children}
            </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
