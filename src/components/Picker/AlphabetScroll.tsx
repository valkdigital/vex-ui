import React, { useContext, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import ThemeContext from "../../style/ThemeContext";

import Spacing from "../../style/spacing";
import Text from "../Text";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

interface AlphabetScrollProps {
  onLetterChange: (letter: string) => void;
}

const AlphabetScroll: React.FC<AlphabetScrollProps> = ({ onLetterChange }) => {
  const [height, setHeight] = useState<number>(0);
  const screenHeight = useWindowDimensions().height;
  let prevIndex = useRef<number>(-1).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          Keyboard.dismiss();
          return true;
        },
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          getTouchedLetter(event.nativeEvent.locationY);
        },
        onPanResponderMove: (event) => {
          getTouchedLetter(event.nativeEvent.locationY);
        },
      }),
    [height]
  );

  const getTouchedLetter = (y: number) => {
    let index = Math.floor((y / height) * ALPHABET.length);
    if (prevIndex === index || index > ALPHABET.length - 1 || index < 0) return;
    onLetterChange(ALPHABET[index]);
    prevIndex = index;
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  const { info } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers} onLayout={onLayout}>
        {ALPHABET.map((letter) => (
          <View pointerEvents="none" key={letter}>
            <Text
              type={screenHeight < 667 ? "label" : "subtextRegular"}
              color={info.midDark}
              textAlign="center"
            >
              {letter}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Spacing.sp5,
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default AlphabetScroll;
