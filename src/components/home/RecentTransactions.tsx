import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../../utils/themes/ThemeContext";
import { AppTheme } from "../../../utils/themes/types";

const txns = [
  { sig: "asdfasdfa", ok: true, send: false },
  { sig: "asdfasasdfa", ok: true, send: true },
  { sig: "a34sdfasdfa", ok: true, send: false },
];

export default function RecentTransactions() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={txns}
        keyExtractor={(t) => t.sig}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`https://solscan.io/tx/${item.sig}`)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: item.send
                      ? theme.status.success
                      : theme.status.error,
                  },
                ]}
              />
              <View>
                <Text style={styles.mint}>fg4...98h</Text>
                <Text style={styles.time}>12:45</Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: theme.borderColor.primary,
              }}
            >
              <Text
                style={{
                  color: theme.textColor.primary,
                  fontSize: 12,
                }}
              >
                View
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.bgColor.secondary,
      padding: 14,
      borderRadius: 20,
      width: "100%",
      color: theme.textColor.primary,
      gap: 14,
    },
    title: {
      color: theme.textColor.primary,
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 14,
      borderRadius: 14,
      marginBottom: 10,
      borderWidth: 0.5,
      borderColor: theme.borderColor.primary,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    mint: {
      color: theme.textColor.primary,
      fontSize: 14,
      fontFamily: "monospace",
    },
    amount: {
      color: theme.textColor.primary,
      fontSize: 14,
      fontWeight: "600",
    },
    tokenRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    time: {
      color: theme.textColor.muted,
      fontSize: 10,
      marginTop: 4,
    },
  });
}
