import { createContext, useContext, useState } from "react";
import { darkTheme } from "./darkTheme";
import { LightTheme } from "./lightTheme";
import { AppTheme } from "./types";

type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : LightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
