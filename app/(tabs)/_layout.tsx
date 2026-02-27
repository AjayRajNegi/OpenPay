import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useTheme } from "../../utils/themes/ThemeContext";
import { View } from "react-native";
import Header from "../../src/components/general/Header";
export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bgColor.primary,
      }}
    >
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.navbar.active.text,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.bgColor.secondary,
            height: 76,
            paddingTop: 4,
            borderTopColor: theme.borderColor.primary,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="home" color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="send"
          options={{
            title: "Send",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="paper-plane" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="receive"
          options={{
            title: "Receive",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="wallet" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="time" color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon name="person" color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

function TabIcon({
  name,
  color,
  focused,
}: {
  name: any;
  color: string;
  focused: boolean;
}) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 32,
        borderRadius: 16,
        backgroundColor: focused ? theme.navbar.active.bg : "transparent",
      }}
    >
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={color}
      />
    </View>
  );
}
