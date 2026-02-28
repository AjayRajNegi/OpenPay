import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useStyles } from "../../utils/themes/useStyles";
import { AppTheme } from "../../utils/themes/types";
import { useTheme } from "../../utils/themes/ThemeContext";

const filters = ["All", "Send", "Received"];

const transactions = [
  {
    id: "1",
    type: "received",
    amount: "+5 USDT",
    address: "asd...gkf",
    date: "Today",
  },
  {
    id: "2",
    type: "sent",
    amount: "-10 USDT",
    address: "asd...gkf",
    date: "Today",
  },
  {
    id: "3",
    type: "received",
    amount: "+5 USDT",
    address: "asd...gkf",
    date: "Yesterday",
  },
  {
    id: "4",
    type: "sent",
    amount: "-10 USDT",
    address: "asd...gkf",
    date: "Yesterday",
  },
  {
    id: "5",
    type: "received",
    amount: "+5 USDT",
    address: "asd...gkf",
    date: "21 Jan",
  },
  {
    id: "6",
    type: "sent",
    amount: "-10 USDT",
    address: "asd...gkf",
    date: "21 Jan",
  },
];

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { theme } = useTheme();
  const styles = useStyles(createStyles);

  const filtered = transactions.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Send") return t.type === "sent";
    if (activeFilter === "Received") return t.type === "received";
  });

  // group by date
  const grouped = filtered.reduce(
    (acc, t) => {
      if (!acc[t.date]) acc[t.date] = [];
      acc[t.date].push(t);
      return acc;
    },
    {} as Record<string, typeof transactions>,
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Transactions History</Text>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            style={[
              styles.filterPill,
              activeFilter === f && styles.filterPillActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === f && styles.filterTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {Object.entries(grouped).map(([date, txs]) => (
        <View key={date} style={styles.group}>
          <Text style={styles.dateLabel}>{date}</Text>
          {txs.map((tx) => (
            <View key={tx.id} style={styles.txCard}>
              <View style={styles.txLeft}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        tx.type === "received"
                          ? theme.status.success
                          : theme.status.error,
                    },
                  ]}
                />
                <View>
                  <Text style={styles.txAmount}>{tx.amount}</Text>
                  <Text style={styles.txAddress}>{tx.address}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bgColor.primary,
      paddingHorizontal: 14,
      paddingVertical: 16,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: theme.textColor.primary,
      marginBottom: 14,
    },

    filterRow: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 20,
    },
    filterPill: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: theme.borderColor.primary,
    },
    filterPillActive: {
      backgroundColor: theme.bgColor.secondary,
      borderColor: theme.borderColor.focused,
    },
    filterText: {
      color: theme.textColor.secondary,
      fontSize: 12,
    },
    filterTextActive: {
      color: theme.textColor.primary,
      fontWeight: "600",
    },

    group: {
      marginBottom: 20,
    },
    dateLabel: {
      color: theme.textColor.secondary,
      fontSize: 12,
      marginBottom: 8,
    },

    txCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.bgColor.secondary,
      borderRadius: 14,
      padding: 14,
      marginBottom: 8,
    },
    txLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    txAmount: {
      color: theme.textColor.primary,
      fontSize: 15,
      fontWeight: "600",
    },
    txAddress: {
      color: theme.textColor.secondary,
      fontSize: 12,
      marginTop: 2,
    },

    viewBtn: {
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: theme.borderColor.primary,
    },
    viewBtnText: {
      color: theme.textColor.primary,
      fontSize: 12,
    },
  });
}
