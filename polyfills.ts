import "react-native-get-random-values";
import { Buffer } from "@craftzdog/react-native-buffer";

if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer as unknown as typeof global.Buffer;
}
