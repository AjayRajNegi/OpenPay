import { Stack } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>SolPay</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button]}>
            <Text style={[styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonContainer]}>
            <Text style={[styles.buttonText]}>Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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
