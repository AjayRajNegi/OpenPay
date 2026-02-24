import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingScreen" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
