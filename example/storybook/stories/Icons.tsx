import React, { useContext } from "react";
import {
  Spacing,
  IconSet,
  Text,
  Icon,
  ThemeContext,
} from "@valkdigital/ui-kit";
import { ScrollView, StyleSheet, View } from "react-native";

interface IconsProps {}

const Icons: React.FC<IconsProps> = () => {
  const { grey, typography } = useContext(ThemeContext);

  return (
    <ScrollView contentContainerStyle={[styles.contentContainer]}>
      <Text type="h1">Icons</Text>
      <Text type="h2">Icons default (outline)</Text>
      <View style={[styles.gridContainer]}>
        {IconSet.iconNames.map((name) => (
          <View
            style={[styles.wrapper, { borderColor: grey[8] }]}
            key={`${name}-wrapper`}
          >
            <Text type="h4">{name}</Text>
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.small}`}
              size={IconSet.iconSizes.small}
              color={typography.color}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.medium}`}
              size={IconSet.iconSizes.medium}
              color={typography.color}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.large}`}
              size={IconSet.iconSizes.large}
              color={typography.color}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes["x-large"]}`}
              size={IconSet.iconSizes["x-large"]}
              color={typography.color}
            />
          </View>
        ))}
      </View>

      <Text type="h2">Icons solid</Text>
      <View style={[styles.gridContainer]}>
        {IconSet.iconNames.map((name) => (
          <View
            style={[styles.wrapper, { borderColor: grey[8] }]}
            key={`${name}-wrapper`}
          >
            <Text type="h4">{name}</Text>
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.small}`}
              size={IconSet.iconSizes.small}
              color={typography.color}
              solid={true}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.medium}`}
              size={IconSet.iconSizes.medium}
              color={typography.color}
              solid={true}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes.large}`}
              size={IconSet.iconSizes.large}
              color={typography.color}
              solid={true}
            />
            <Icon
              name={name}
              key={`${name}-${IconSet.iconSizes["x-large"]}`}
              size={IconSet.iconSizes["x-large"]}
              color={typography.color}
              solid={true}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

/* ========================================================================== *\
  STYLES
\* ========================================================================== */
const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "hidden",
    paddingHorizontal: Spacing.sp1,
    paddingTop: Spacing.sp1,
  },
  wrapper: {
    borderWidth: 1,
    margin: Spacing.sp1,
    flexDirection: "column",
    paddingHorizontal: Spacing.sp1,
    paddingVertical: Spacing.sp2,
  },
  gridContainer: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 1400,
  },
});
/* == STYLES ================================================================ */

/* ========================================================================== *\
  EXPORTS
\* ========================================================================== */
export default Icons;
/* == EXPORTS =============================================================== */
