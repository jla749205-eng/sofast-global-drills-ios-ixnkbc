
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../styles/commonStyles';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../../components/IconSymbol';

export default function Profile() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Submission Guide',
      description: 'View privacy policy and support information',
      icon: 'arrow.up.circle.fill',
      androidIcon: 'upload',
      route: '/submission-guide',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SOFAST Global</Text>
        <Text style={styles.headerSubtitle}>Professional Marksmanship Training</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.menuItemIcon}>
                <IconSymbol 
                  ios_icon_name={item.icon} 
                  android_material_icon_name={item.androidIcon} 
                  size={28} 
                  color={colors.primary} 
                />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>
                  {item.title}
                </Text>
                <Text style={styles.menuItemDescription}>
                  {item.description}
                </Text>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="chevron_right" 
                size={20} 
                color={colors.text} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Team:</Text>
            <Text style={styles.infoValue}>Team SOFAST LLC</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>✅ Ready to Submit</Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>✅ Your App is Complete!</Text>
          <Text style={styles.statusText}>
            All features are working and ready for the App Store.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 60 : 70,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  statusCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 15,
    color: colors.text,
  },
});
