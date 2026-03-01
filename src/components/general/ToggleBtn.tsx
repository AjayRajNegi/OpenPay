import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { AppTheme } from "../../../utils/themes/types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useStyles } from "../../../utils/themes/useStyles";

type ToggleBtnProps = {
  label: string;
  active: boolean;
} & TouchableOpacityProps;

export default function ToggleBtn({ label, active, ...props }: ToggleBtnProps) {
  const toggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: active ? 22 : 2,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [active]);

  const styles = useStyles(createStyles);

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.toggleText}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.toggleTrack,
          active ? styles.toggleTrackActive : styles.toggleTrackInactive,
        ]}
        {...props}
      >
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              transform: [
                {
                  translateX: toggleAnim,
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

function createStyles(theme: AppTheme) {
  return StyleSheet.create({
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 20,
      backgroundColor: theme.bgColor.secondary,
      paddingVertical: 16,
      paddingHorizontal: 16,
      color: theme.textColor.primary,
    },
    toggleText: {
      fontSize: 14,
      color: theme.textColor.primary,
    },
    toggleTrack: {
      width: 50,
      height: 28,
      borderRadius: 14,
      justifyContent: "center",
    },
    toggleTrackActive: {
      backgroundColor: theme.toogleBtn.active.bg,
    },
    toggleTrackInactive: {
      backgroundColor: theme.toogleBtn.inActive.bg,
    },
    toggleThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.toogleBtn.inActive.dot,
      shadowColor: theme.toogleBtn.inActive.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
  });
}
