import { StyleSheet, Text, View } from 'react-native';

export default function OfflineScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offline Maps</Text>
      <Text style={styles.subtitle}>Downloaded offline map packs will live here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
});
