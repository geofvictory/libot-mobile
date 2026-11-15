import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'map', android: 'map', web: 'map' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'tray.full', android: 'folder', web: 'folder' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'calendar', android: 'calendar', web: 'calendar' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="offline"
        options={{
          title: 'Offline',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: 'cloud.rain', android: 'cloud', web: 'cloud' }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}