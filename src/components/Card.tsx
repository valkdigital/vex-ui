import React, { ReactChild } from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  Dimensions,
} from "react-native";
import Text from "./Text";
import Button from "./Button";
import spacing from "../style/spacing";
import shadow from "../style/shadow";
import LinearGradient from "react-native-linear-gradient";

type Sizes = "large" | "medium" | "small" | "tiny" | "single";

const IMAGE_STYLE: { [key in Sizes]: ViewStyle & ImageStyle } = {
  large: {
    width: "100%",
    height: 160,
  },
  medium: {
    width: "100%",
    height: 120,
  },
  small: {
    width: 90,
    height: 90,
  },
  tiny: {
    width: 80,
    height: 80,
  },
  single: {
    width: "100%",
    height: 160,
  },
};

const CONTAINER_STYLE: { [key in Sizes]: ViewStyle } = {
  large: {
    flexDirection: "column",
  },
  medium: {
    flexDirection: "column",
  },
  small: {
    flexDirection: "row",
  },
  tiny: {
    flexDirection: "row",
  },
  single: {},
};

export interface CardProps {
  image: ImageSourcePropType;
  imageHeader?: string;
  imageOverlay?: ReactChild;
  header?: string;
  subHeader?: string;
  supportiveText?: string;
  assets?: ReactChild;
  buttonText?: string;
  onPressParam?: any;
  onPress: (onPressParam?: any) => void;
  size: Sizes;
}
const Card: React.FC<CardProps> = ({
  image,
  imageHeader,
  imageOverlay,
  header,
  subHeader,
  supportiveText,
  assets,
  buttonText,
  onPressParam,
  onPress,
  size = "large",
}) => {
  const getImageStyle = (): ViewStyle & ImageStyle => {
    return IMAGE_STYLE[size];
  };
  const getContainerStyle = (): ViewStyle => {
    return CONTAINER_STYLE[size];
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(onPressParam)}
      disabled={!!buttonText}
    >
      <View style={[styles.container, getContainerStyle()]}>
        <View>
          <Image source={image} style={[styles.image, getImageStyle()]} />
          {size !== "small" && size !== "tiny" && (
            <>
              <View style={styles.imageOverlay}>
                {imageOverlay && imageOverlay}
              </View>
              <View style={[styles.imageContainer, getImageStyle()]}>
                {imageHeader && (
                  <Text type="h4" color="#ffffff" style={styles.imageHeader}>
                    {imageHeader}
                  </Text>
                )}
              </View>
              <LinearGradient
                colors={["transparent", "rgba(0, 0, 0, 0.4)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  position: "absolute",
                  top: (getImageStyle().height as number) * 0.5,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: (getImageStyle().height as number) * 0.5,
                }}
              />
            </>
          )}
        </View>

        {size !== "single" && (
          <View style={styles.bodyContainer}>
            {header && <Text type="h5">{header}</Text>}
            {subHeader && (
              <Text type="subtextRegular" style={styles.subHeader}>
                {subHeader}
              </Text>
            )}
            {supportiveText && (
              <Text type="bodyRegular" style={styles.supportive}>
                {supportiveText}
              </Text>
            )}
            {assets && assets}
          </View>
        )}
        {!!buttonText && size === "large" && (
          <Button
            title={buttonText}
            onPress={() => onPress(onPressParam)}
            size="large"
            style={[styles.space24, { borderRadius: 0 }]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginLeft: spacing.sp3,
    width: Dimensions.get("window").width - spacing.sp6,
    ...shadow({ x: 0, y: 2, opacity: 0.13, blurRadius: 8 }),
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: spacing["sp1/2"],
    overflow: "hidden",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.sp2,
    zIndex: 10,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  imageHeader: {
    zIndex: 10,
  },
  image: {
    resizeMode: "cover",
  },
  bodyContainer: {
    padding: spacing.sp2,
    minHeight: spacing.sp6,
    backgroundColor: "white",
    overflow: "hidden",
  },
  subHeader: {
    marginTop: 4,
  },
  supportive: {
    marginTop: spacing["sp1/2"],
  },
  space24: {
    marginTop: spacing.sp3,
  },
});
