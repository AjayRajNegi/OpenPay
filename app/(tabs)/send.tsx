import { Text, View } from "react-native";
import Headers from "../../src/components/general/Headers";
import { ConnectButton } from "../../src/components/general/ConnectButton";

export default function send() {
  const pubKey = "EmzwsPbxRnTE2Du3Tj6Q7wU9v4xSsYS28csGDor3Md32";
  return (
    <>
      <Headers />
      <ConnectButton
        onConnect={(pubKey, authToken) => {
          console.log(pubKey, authToken);
        }}
        onError={(error) => {
          console.log(error);
        }}
      />
      <View>
        <Text>Send</Text>
      </View>
    </>
  );
}
