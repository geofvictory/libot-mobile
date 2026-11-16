import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTripStore } from '../../store/useTripStore';

interface MapPack {
  id: string;
  region: string;
  details: string;
  size: string;
}

const BAY_AREA_PACKS: MapPack[] = [
  { id: 'east-bay', region: 'Fremont & East Bay Hills', details: 'Mission Peak, Sunol, Ohlone Wilderness', size: '42 MB' },
  { id: 'santa-cruz', region: 'Santa Cruz Mountains & Coast', details: 'Castle Rock, Big Basin, Wilder Ranch', size: '68 MB' },
  { id: 'sf-marin', region: 'San Francisco & Marin Headlands', details: 'Lands End, Mt. Tamalpais', size: '54 MB' },
];

export default function OfflineScreen() {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [downloadedIds, setDownloadedIds] = useState<string[]>(['east-bay']); // Pre-cache Fremont by default
  const { savedSpots } = useTripStore();

  const toggleDownload = (id: string) => {
    if (downloadedIds.includes(id)) {
      setDownloadedIds(downloadedIds.filter((item) => item !== id));
    } else {
      setDownloadedIds([...downloadedIds, id]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Offline Manager</Text>
      <Text style={styles.subtitle}>Download trail maps before heading out of cell range.</Text>

      {/* Offline Simulation Toggle */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.textBlock}>
            <Text style={styles.cardTitle}>Simulate Offline Mode</Text>
            <Text style={styles.cardSub}>Force app to use cached maps & trip data</Text>
          </View>
          <Switch
            value={isOfflineMode}
            onValueChange={setIsOfflineMode}
            trackColor={{ false: '#ccc', true: '#81C784' }}
            thumbColor={isOfflineMode ? '#2E7D32' : '#f4f3f4'}
          />
        </View>
        {isOfflineMode && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Offline Mode Active — Using local device storage</Text>
          </View>
        )}
      </View>

      {/* Synced Trip Data Status */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cached Trip Itineraries</Text>
        <Text style={styles.cardSub}>
          {savedSpots.length === 0
            ? 'No spots saved yet. Add spots from the Map tab to auto-cache them.'
            : `${savedSpots.length} saved spot(s) automatically stored offline for trail access.`}
        </Text>
      </View>

      {/* Downloadable Region Packs */}
      <Text style={styles.sectionHeader}>BAY AREA TOPOGRAPHIC PACKS</Text>
      {BAY_AREA_PACKS.map((pack) => {
        const isDownloaded = downloadedIds.includes(pack.id);
        return (
          <View key={pack.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <View style={styles.textBlock}>
                <Text style={styles.packTitle}>{pack.region}</Text>
                <Text style={styles.cardSub}>{pack.details}</Text>
                <Text style={styles.sizeText}>{pack.size} • Terrain & Trails</Text>
              </View>
              <TouchableOpacity
                style={[styles.dlButton, isDownloaded && styles.dlButtonDone]}
                onPress={() => toggleDownload(pack.id)}
              >
                <Text style={[styles.dlButtonText, isDownloaded && styles.dlButtonTextDone]}>
                  {isDownloaded ? '✓ Saved' : 'Download'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 20 },
  sectionHeader: { fontSize: 12, fontWeight: '700', color: '#888', marginTop: 12, marginBottom: 8, letterSpacing: 0.5 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  textBlock: { flex: 1, paddingRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#222' },
  packTitle: { fontSize: 15, fontWeight: '700', color: '#222' },
  cardSub: { fontSize: 13, color: '#666', marginTop: 3 },
  sizeText: { fontSize: 11, fontWeight: '600', color: '#2E7D32', marginTop: 6 },
  banner: { backgroundColor: '#E8F5E9', padding: 10, borderRadius: 8, marginTop: 12 },
  bannerText: { color: '#2E7D32', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  dlButton: { backgroundColor: '#2E7D32', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  dlButtonDone: { backgroundColor: '#E8F5E9', borderWidth: 1, borderColor: '#2E7D32' },
  dlButtonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  dlButtonTextDone: { color: '#2E7D32' },
});