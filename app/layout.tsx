import './main.scss'
// import 
import type { Metadata } from "next";

// import { SessionProvider } from "next-auth/react";


export const metadata: Metadata = {
  title: "Registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
