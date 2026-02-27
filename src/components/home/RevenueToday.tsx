import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useWalletStore } from "../../stores/wallet-store";

export default function RevenueToday() {
  const revenueToday = useWalletStore((s) => s.revenueToday);

  const [prices, setPrices] = useState<{
    solUsd: number;
    ethUsd: number;
  } | null>(null);

  useEffect(() => {
    const getPrices = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd",
      );
      const data = await res.json();

      setPrices({
        solUsd: data.solana.usd,
        ethUsd: data.ethereum.usd,
      });
    };
    getPrices();
  }, []);

  if (!prices) return null;

  const usdc = revenueToday * prices.solUsd;
  const eth = usdc / prices.ethUsd;
  return (
    <View style={styles.container}>
      <View style={styles.innerC1}>
        <Text style={styles.title}>Revenue Today</Text>
        <Text style={styles.time}>{Date.now()}</Text>
      </View>

      <View style={styles.innerC2}>
        <Text style={styles.primary}>{revenueToday} </Text>
        <Text style={styles.currency}>SOL</Text>
      </View>

      <View style={styles.conversions}>
        <Text style={styles.secondary}>≈ {usdc.toFixed(2)} USDC</Text>
        <Text style={styles.secondary}>≈ {eth.toFixed(6)} ETH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    color: "white",
    paddingHorizontal: 8,
  },

  innerC1: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: -1,
  },
  time: {},

  innerC2: { flexDirection: "row", alignItems: "flex-end" },
  primary: {
    color: "white",
    fontSize: 50,
    fontWeight: 800,
    lineHeight: 40,
    letterSpacing: -2,
  },
  currency: { color: "white", fontSize: 20, fontWeight: 800, marginLeft: -8 },

  conversions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  secondary: {
    color: "#9ca3af",
    fontSize: 13,
  },
});
