import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthContext } from "@/context/auth";
import FlashMessage from "react-native-flash-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState(null);
  const [bareUser, setBareUser] = useState(null);
  const [userDb, setUserDb] = useState(null);
  const [authIsInitializing, setAuthIsInitializing] = useState(false);

  const authProviderValue = {
    user: user,
    userDb: userDb,
    bareUser: bareUser,
    isInitializing: authIsInitializing,
  };

  useEffect(() => {
    if (loaded && !authIsInitializing) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authIsInitializing]);

  if (!loaded || authIsInitializing) {
    return null;
  }

  return (
    <AuthContext.Provider value={authProviderValue}>
      <GluestackUIProvider mode="light">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <FlashMessage position="top" />
        </ThemeProvider>
      </GluestackUIProvider>
    </AuthContext.Provider>
  );
}
