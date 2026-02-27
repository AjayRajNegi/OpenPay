import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useWalletStore } from "../../src/stores/wallet-store";
import Balance from "../../src/components/home/Balance";
import RevenueToday from "../../src/components/home/RevenueToday";
import RecentTransactions from "../../src/components/home/RecentTransactions";
import { useTheme } from "../../utils/themes/ThemeContext";
import { AppTheme } from "../../utils/themes/types";
import MainButtons from "../../src/components/home/MainButtons";

export default function Tab() {
  const router = useRouter();

  const isDevnet = useWalletStore((s) => s.isDevnet);
  const isMerchant = useWalletStore((s) => s.isMerchant);

  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          gap: 20,
        }}
      >
        {isMerchant == true ? (
          <>
            <RevenueToday />
          </>
        ) : (
          <>
            <Balance />
          </>
        )}
        <RecentTransactions />
      </View>
    </ScrollView>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor.primary,
      paddingHorizontal: 14,
    },
    // title: {
    //   fontSize: 28,
    //   fontWeight: "bold",
    //   marginBottom: 40,
    //   color: "#333",
    // },
    // valueContainer: {
    //   backgroundColor: "white",
    //   padding: 30,
    //   borderRadius: 15,
    //   marginBottom: 40,
    //   shadowColor: "#000",
    //   shadowOffset: { width: 0, height: 2 },
    //   shadowOpacity: 0.1,
    //   shadowRadius: 4,
    //   elevation: 3,
    //   minWidth: 200,
    //   alignItems: "center",
    // },
    // label: {
    //   fontSize: 16,
    //   color: "#666",
    //   marginBottom: 10,
    // },
    // value: {
    //   fontSize: 48,
    //   fontWeight: "bold",
    //   color: "#007AFF",
    // },
    // buttonContainer: {
    //   gap: 15,
    //   width: "100%",
    //   maxWidth: 300,
    // },
    // button: {
    //   backgroundColor: "#007AFF",
    //   padding: 15,
    //   borderRadius: 10,
    //   alignItems: "center",
    // },
    // buttonSecondary: {
    //   backgroundColor: "#34C759",
    // },
    // buttonDanger: {
    //   backgroundColor: "#FF3B30",
    // },
    // buttonText: {
    //   color: "white",
    //   fontSize: 16,
    //   fontWeight: "600",
    // },
  });
}
