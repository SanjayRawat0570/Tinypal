import React, { useRef, useMemo, useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Pressable, FlatList, TextInput, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DidYouKnow from './src/screens/DidYouKnow';
import FlashCard from './src/screens/FlashCard';
import TinuBottomSheet from './src/components/TinuBottomSheet';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tinuVisible, setTinuVisible] = useState(false);
  const [tinuContext, setTinuContext] = useState('did_you_know');

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen name="DidYouKnow" options={{ title: 'Did You Know' }}>
            {(props) => (
              <DidYouKnow {...props} onOpenTinu={() => { setTinuContext('did_you_know'); setTinuVisible(true); }} />
            )}
          </Stack.Screen>
          <Stack.Screen name="FlashCard" options={{ title: 'Flash Cards' }}>
            {(props) => (
              <FlashCard {...props} onOpenTinu={() => { setTinuContext('flash_card'); setTinuVisible(true); }} />
            )}
          </Stack.Screen>
        </Stack.Navigator>

        <TinuBottomSheet visible={tinuVisible} context={tinuContext} onClose={() => setTinuVisible(false)} />
      </SafeAreaView>
    </NavigationContainer>
  );
}
