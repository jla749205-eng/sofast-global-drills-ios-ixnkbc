
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '../../styles/commonStyles';
import { IconSymbol } from '../../components/IconSymbol';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const menuItems = [
    {
      title: '📱 App Store Submission Guide',
      subtitle: 'Step-by-step guide to submit your app',
      icon: 'app.badge.checkmark.fill',
      androidIcon: 'verified',
      action: () => router.push('/submission-guide'),
      highlighted: true,
      color: colors.primary
    },
    {
      title: '🔑 My Credentials',
      subtitle: 'View your Apple Developer credentials',
      icon: 'key.fill',
      androidIcon: 'vpn_key',
      action: () => router.push('/credentials'),
      highlighted: false
    },
    {
      title: 'Subscription',
      subtitle: 'Manage your subscription',
      icon: 'star.fill',
      androidIcon: 'star',
      action: () => Alert.alert('Subscription', 'Coming soon!')
    },
    {
      title: 'Settings',
      subtitle: 'App preferences',
      icon: 'gear',
      androidIcon: 'settings',
      action: () => Alert.alert('Settings', 'Coming soon!')
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help or contact us',
      icon: 'questionmark.circle',
      androidIcon: 'help',
      action: () => Alert.alert('Support', 'For app submission help, see the Submission Guide above.')
    }
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Profile',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="account_circle"
              size={80}
              color={colors.primary}
            />
          </View>
          <Text style={styles.nameText}>SOFAST User</Text>
          <Text style={styles.emailText}>Team SOFAST LLC</Text>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeCard}>
          <IconSymbol 
            ios_icon_name="info.circle.fill" 
            android_material_icon_name="info"
            size={32}
            color={colors.primary}
          />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Ready to Submit?</Text>
            <Text style={styles.noticeText}>
              Check out the App Store Submission Guide below for step-by-step instructions on how to get your app live.
            </Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.menuItem, 
                item.highlighted && styles.menuItemHighlighted
              ]}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={[
                  styles.iconContainer, 
                  item.highlighted && styles.iconContainerHighlighted
                ]}>
                  <IconSymbol 
                    ios_icon_name={item.icon} 
                    android_material_icon_name={item.androidIcon}
                    size={24}
                    color={item.highlighted ? '#fff' : colors.text}
                  />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={[
                    styles.menuItemTitle, 
                    item.highlighted && styles.menuItemTitleHighlighted
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={[
                    styles.menuItemSubtitle, 
                    item.highlighted && styles.menuItemSubtitleHighlighted
                  ]}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <IconSymbol 
                ios_icon_name="chevron.right" 
                android_material_icon_name="chevron_right"
                size={20}
                color={item.highlighted ? '#fff' : colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol 
            ios_icon_name="arrow.right.square" 
            android_material_icon_name="logout"
            size={20}
            color="#ff4444"
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '20',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemHighlighted: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconContainerHighlighted: {
    backgroundColor: `${colors.primary}30`,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  menuItemTitleHighlighted: {
    color: '#fff',
    fontWeight: '700',
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  menuItemSubtitleHighlighted: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
    marginLeft: 8,
  },
});
