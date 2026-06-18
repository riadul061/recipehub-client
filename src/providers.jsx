"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
export function Providers({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { borderRadius: "10px", background: "#333", color: "#fff" } }} />
    </NextThemesProvider>
  );
}