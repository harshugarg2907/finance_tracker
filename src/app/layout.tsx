import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Track your expenses easily with charts & insights",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-black text-white">
          <NavigationMenu className="max-w-screen-md mx-auto px-4 py-3">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/transactions" className="text-sm font-medium">Transactions</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/charts" className="text-sm font-medium">Charts</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/budget" className="text-sm font-medium">Budget Insights</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>

      
        <main className="p-4 max-w-screen-lg mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
