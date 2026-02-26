import "../polyfills";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../utils/themes/ThemeContext";

export default function RootLayout() {
  return (
    <>
      <ThemeProvider>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(e)" options={{ headerShown: false }} />
          </Stack>
          <ThemedStatusBar />
        </SafeAreaProvider>
      </ThemeProvider>
    </>
  );
}

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? "light" : "dark"} />;
}
