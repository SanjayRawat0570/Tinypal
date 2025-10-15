import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export default function TinuBottomSheet({ visible, context, onClose }) {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['35%', '70%'], []);
  const [cards, setCards] = useState([]);
  const [chips, setChips] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (visible) {
      // fetch data
      axios.post(`${API_BASE}/activate_tinu`, {
        child_id: 'EXAMPLECHILD',
        context: context,
        module_id: '1',
        topic: 'nutrition_impacts_mood'
      }).then(res => {
        setCards(res.data.cards || []);
        setChips(res.data.chips || []);
      }).catch(err => console.warn(err.message));
    }
  }, [visible, context]);

  useEffect(() => {
    if (sheetRef.current) {
      if (visible) sheetRef.current.expand(); else sheetRef.current.close();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints} onClose={onClose} enablePanDownToClose>
      <View style={styles.container}>
        <FlatList
          data={cards}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.tinuCard}>
              <Text style={styles.tinuTitle}>{item.title}</Text>
              <Text style={styles.tinuBody}>{item.body}</Text>
            </View>
          )}
        />

        <View style={styles.chipsRow}>
          {chips.map(ch => (
            <Pressable key={ch.id} style={styles.chip}><Text>{ch.label}</Text></Pressable>
          ))}
        </View>

        <View style={styles.askBox}>
          <TextInput placeholder="Ask me Anything..." value={input} onChangeText={setInput} style={styles.input} />
          <Pressable style={styles.send}><Text style={{ color: '#fff' }}>Send</Text></Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, flex: 1 },
  tinuCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginRight: 12, width: Dimensions.get('window').width * 0.6 },
  tinuTitle: { fontWeight: '700', marginBottom: 6 },
  tinuBody: { color: '#333' },
  chipsRow: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap' },
  chip: { backgroundColor: '#eee', padding: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  askBox: { flexDirection: 'row', marginTop: 'auto', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, marginRight: 8 },
  send: { backgroundColor: '#4f46e5', padding: 10, borderRadius: 8 }
});
