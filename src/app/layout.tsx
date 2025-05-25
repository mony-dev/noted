import { Open_Sans } from "next/font/google";
import "@/styles/globals.scss";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { ToastContainer } from "react-toastify";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"], 
  variable: "--font-open-sans", 
});

export const metadata = {
  title: "NOTED",
  description: "To do list app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="bg-gray-50">
        <Header />
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </div>
      </body>
    </html>
  );
}
