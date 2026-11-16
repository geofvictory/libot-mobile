import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTripStore } from '../../store/useTripStore';

type Category = 'all' | 'hike' | 'bike' | 'climb' | 'food';

interface Spot {
  id: string;
  name: string;
  category: Exclude<Category, 'all'>;
  lat: number;
  lng: number;
  note: string;
}

const SAMPLE_SPOTS: Spot[] = [
  { id: '1', name: 'Mission Peak Trailhead', category: 'hike', lat: 37.5259, lng: -121.9168, note: 'Classic Fremont climb & pole' },
  { id: '2', name: 'Castle Rock State Park', category: 'climb', lat: 37.2273, lng: -122.1150, note: 'Sandstone bouldering near Santa Cruz mountains' },
  { id: '3', name: 'Santa Cruz Main Beach', category: 'bike', lat: 36.9631, lng: -122.0256, note: 'Coastal cruise & boardwalk' },
  { id: '4', name: 'San Francisco Ferry Building', category: 'food', lat: 37.7955, lng: -122.3937, note: 'Post-trip artisanal food & coffee' },
];

const PIN_COLORS: Record<Exclude<Category, 'all'>, string> = {
  hike: '#2E7D32',
  bike: '#1565C0',
  climb: '#EF6C00',
  food: '#C62828',
};

export default function MapScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const { addSpot, savedSpots } = useTripStore();

  const filteredSpots = selectedCategory === 'all'
    ? SAMPLE_SPOTS
    : SAMPLE_SPOTS.filter((spot) => spot.category === selectedCategory);

  const isAlreadySaved = (id: string) => savedSpots.some((s) => s.id === id);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="terrain"
        initialRegion={{
          latitude: 37.45,
          longitude: -122.05,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        }}
        // Remove the onPress={() => setSelectedSpot(null)} from here!
      >
       {filteredSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.lat, longitude: spot.lng }}
            pinColor={PIN_COLORS[spot.category]}
            onPress={(e) => {
              // Prevents any native event bubbling delays on mobile
              e.stopPropagation?.();
              setSelectedSpot(spot);
            }}
          />
        ))}
      </MapView>

      {/* Floating Filter Bar */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {(['all', 'hike', 'bike', 'climb', 'food'] as Category[]).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {cat.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Google Maps-style Bottom Info Card - Rendered directly */}
      {selectedSpot !== null && (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardCategory}>{selectedSpot.category.toUpperCase()}</Text>
              <Text style={styles.cardTitle}>{selectedSpot.name}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedSpot(null)} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.cardNote}>{selectedSpot.note}</Text>

          <TouchableOpacity
            style={[styles.actionButton, isAlreadySaved(selectedSpot.id) && styles.actionButtonSaved]}
            onPress={() => {
              if (!isAlreadySaved(selectedSpot.id)) {
                addSpot(selectedSpot);
              }
            }}
          >
            <Text style={styles.actionButtonText}>
              {isAlreadySaved(selectedSpot.id) ? '✓ Saved to Trips' : '+ Add to Trip'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  map: { flex: 1 },
  filterWrapper: { position: 'absolute', top: 60, left: 0, right: 0, zIndex: 5 },
  filterRow: { paddingHorizontal: 16, gap: 8 },
  chip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  chipActive: { backgroundColor: '#2E7D32' },
  chipText: { fontSize: 12, fontWeight: '700', color: '#333' },
  chipTextActive: { color: '#fff' },
  cardContainer: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: { padding: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardCategory: { fontSize: 11, fontWeight: '700', color: '#2E7D32', marginBottom: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  closeText: { fontSize: 18, color: '#888', paddingHorizontal: 8 },
  cardNote: { fontSize: 14, color: '#666', marginVertical: 8 },
  actionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  actionButtonSaved: { backgroundColor: '#4CAF50' },
  actionButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});