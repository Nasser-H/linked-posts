"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "./_Components/navbar/page";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from "react-redux";
import { store } from "./_Components/redux/store";
import { Toaster } from "react-hot-toast";
import { Container } from "@mui/material";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Linked Posts",
//   description: "A collection of related posts designed to offer insightful connections between topics",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/icon-linkedin-favicon.png" type="image/png"/> */}
        <title>Linked Posts</title>
        <meta name="description" content="A custom description for the client-side." />
      </head>
      <body style={{ backgroundColor: '#e3e2e2' }} className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <AppRouterCacheProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Navbar/>
                <Container maxWidth="sm" sx={{ mt:15,mb:5,minHeight:"100vh" }}>
                  {children}
                </Container>
              <Toaster/>
            </LocalizationProvider>
          </AppRouterCacheProvider>           
        </Provider>       
      </body>
    </html>
  );
}
