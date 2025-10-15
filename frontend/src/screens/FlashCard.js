import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE } from '../config';

export default function FlashCard({ onOpenTinu }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    axios.post(`${API_BASE}/p13n_answers`, {
      module_id: '1',
      parent_id: 'EXAMPLEPARENT',
      child_id: 'EXAMPLECHILD',
      responses: []
    }).then(res => {
      setCards(res.data.flash_cards || []);
    }).catch(err => console.warn(err.message));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => setFlipped(s => ({ ...s, [item.id]: !s[item.id] }))} style={styles.card}>
            <Text style={styles.title}>{flipped[item.id] ? item.back : item.front}</Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={onOpenTinu}>
          <Text style={styles.buttonText}>Ask Tinu</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  footer: { padding: 12, borderTopWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
