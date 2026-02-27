import { useMemo } from "react";
import { useTheme } from "./ThemeContext";
import { AppTheme } from "./types";

export function useStyles<T>(createStyles: (theme: AppTheme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => createStyles(theme), [theme]);
}
