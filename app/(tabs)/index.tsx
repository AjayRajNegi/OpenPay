import { useRouter } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useWalletStore } from "../../src/stores/wallet-store";
import Headers from "../../src/components/general/Headers.tsx";

export default function Tab() {
  const router = useRouter();

  const isDevnet = useWalletStore((s) => s.isDevnet);
  return (
    <>
      <View style={styles.container}>
        <Headers />
        <Text style={styles.title}>Home Screen</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text>{isDevnet ? "True" : "False"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  valueContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 15,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  value: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
  buttonContainer: {
    gap: 15,
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#34C759",
  },
  buttonDanger: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
