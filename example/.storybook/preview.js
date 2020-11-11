import React, { useEffect, useState } from "react";
import { useDarkMode } from "storybook-dark-mode";
import { addDecorator } from "@storybook/react";

import { themes } from '@storybook/theming';

import * as Font from "expo-font";

// your theme provider
import { ThemeContext, ThemeManager, Spacing, Text } from "@valkdigital/ui-kit";

// create a component that uses the dark mode hook
const ThemeWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const darkmodeOn = useDarkMode();
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "SourceSansPro-Bold": require("../assets/fonts/SourceSansPro-Bold.ttf"),
        "SourceSansPro-Regular": require("../assets/fonts/SourceSansPro-Regular.ttf"),
        "SourceSansPro-SemiBold": require("../assets/fonts/SourceSansPro-SemiBold.ttf"),
        "SourceSansPro-Italic": require("../assets/fonts/SourceSansPro-Italic.ttf"),
      });
    };

    loadFonts();
    setLoading(false);
  }, []);
  if (loading) return <Text>Setting theme..</Text>;
  return (
    <ThemeContext.Provider
      value={{
        ...ThemeManager.getTheme(darkmodeOn ? "dark" : "light")
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

import { addParameters } from '@storybook/react'; // or any other type of storybook
 
addParameters({
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark,  appContentBg: 'black' },
    // Override the default light theme
  }
});

addDecorator((renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>);
