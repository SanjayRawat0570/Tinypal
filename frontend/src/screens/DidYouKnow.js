import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export default function DidYouKnow({ navigation, onOpenTinu }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.post(`${API_BASE}/p13n_answers`, {
      module_id: '1',
      parent_id: 'EXAMPLEPARENT',
      child_id: 'EXAMPLECHILD',
      responses: []
    }).then(res => {
      setCards(res.data.dyk_cards || []);
    }).catch(err => {
      console.warn(err.message);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={onOpenTinu}>
          <Text style={styles.buttonText}>Ask Tinu</Text>
        </Pressable>
        <Pressable style={styles.link} onPress={() => navigation.navigate('FlashCard')}>
          <Text style={styles.linkText}>Go to Flash Cards</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 8, elevation: 2 },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  desc: { color: '#444' },
  footer: { padding: 12, borderTopWidth: 1, borderColor: '#eee' },
  button: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { marginTop: 8, alignItems: 'center' },
  linkText: { color: '#4f46e5' }
});
