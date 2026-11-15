import { StyleSheet, Text, View } from 'react-native';

export default function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trips</Text>
      <Text style={styles.subtitle}>Your saved itineraries will live here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
});