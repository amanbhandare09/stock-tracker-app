import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/ui/header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" data-theme="night" >
      <title>Stock Tracker</title>
      <body className={`${inter.className} bg-base-300 text-base-content h-screen`} >
        <Header/>
        <div className="w-auto bg-base-300" >{children}</div>  
      </body>
    </html>
  );
}
