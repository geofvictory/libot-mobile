import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTripStore } from '../../store/useTripStore';

export default function TripsScreen() {
  const { savedSpots, removeSpot } = useTripStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Trips</Text>
      {savedSpots.length === 0 ? (
        <Text style={styles.subtitle}>No spots added yet. Head to the Map tab to explore and save some!</Text>
      ) : (
        <FlatList
          data={savedSpots}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.spotName}>{item.name}</Text>
                <Text style={styles.spotCategory}>{item.category.toUpperCase()} • {item.note}</Text>
              </View>
              <TouchableOpacity onPress={() => removeSpot(item.id)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32', marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  list: { gap: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: { flex: 1, marginRight: 12 },
  spotName: { fontSize: 16, fontWeight: '600', color: '#333' },
  spotCategory: { fontSize: 12, color: '#666', marginTop: 4 },
  removeButton: { backgroundColor: '#FFEBEE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  removeText: { color: '#C62828', fontSize: 12, fontWeight: '600' },
});