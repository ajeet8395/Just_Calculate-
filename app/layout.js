import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ToggleButton from "@/components/toggleButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#f7f7f7] dark:bg-gray-800"}>
        <ThemeProvider attribute="class">
          <ToggleButton />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
