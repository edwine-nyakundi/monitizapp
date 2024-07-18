import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme() || 'light'; // Default to 'light' if colorScheme is null

  const headerBackgroundColor = {
    light: '#A1CEDC',
    dark: '#1D3D47'
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SignedIn>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconMargin}>
            <Ionicons name="person-outline" size={24} color={Colors[colorScheme].tint} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={[styles.searchInput, { backgroundColor: Colors.SEARCH }]}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconMargin}>
              <Ionicons name="chatbubble-outline" size={24} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconMargin}>
              <Ionicons name="notifications-outline" size={24} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
          </View>
        </View>

        <ParallaxScrollView
          headerBackgroundColor={headerBackgroundColor}
          headerImage={
            <Image
              source={require('@/assets/images/travelsocial_logo.png')}
              style={styles.reactLogo}
            />
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">MONITIZTRAVELLERS!</ThemedText>
            <HelloWave />
          </ThemedView>

          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle">Plan Your Next Adventure</ThemedText>
            <ThemedText>
              Start exploring destinations, booking flights, hotels, and activities, all in one place.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle">Connect and Share Experiences</ThemedText>
            <ThemedText>
              Connect with fellow travelers, share travel stories, and discover new destinations together.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle">Get Started</ThemedText>
            <ThemedText>
              Customize your profile, explore travel guides, and plan your journey with ease.
            </ThemedText>
          </ThemedView>
        </ParallaxScrollView>
      </SignedIn>
      
      <SignedOut>
      <ParallaxScrollView
          headerBackgroundColor={headerBackgroundColor}
          headerImage={
            <Image
              source={require('@/assets/images/travelsocial_logo.png')}
              style={styles.reactLogo}
            />
          }
        ></ParallaxScrollView>
        <View style={styles.signedOutContainer}>
          <ThemedText type="title">Welcome to MonitizTravellers!</ThemedText>
          <ThemedText>Please sign in or sign up to continue.</ThemedText>
          <View style={styles.authButtonsContainer}>
            <Link href="/sign-in" style={styles.authButton}>
              <ThemedText>Sign In</ThemedText>
            </Link>
            <Link href="/sign-up" style={styles.authButton}>
              <ThemedText>Sign Up</ThemedText>
            </Link>
          </View>
        </View>
      </SignedOut>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginLeft: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  reactLogo: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  signedOutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  authButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});
