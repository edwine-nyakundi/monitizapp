import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CreatePostScreen() {
  const [postText, setPostText] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); // Define imageUri as string | null

  const handlePost = () => {
    if (postText.trim().length > 0 || imageUri) {
      // Handle posting logic (e.g., API call to submit the post)
      Alert.alert('Post Submitted', 'Your post has been submitted successfully.');
      setPostText('');
      setImageUri(null);
    } else {
      Alert.alert('Error', 'Please enter some text or upload an image to post.');
    }
  };

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    }) as ImagePicker.ImagePickerResult; // Type assertion to ImagePickerResult

    if (!pickerResult.canceled) {
      setImageUri(pickerResult.uri); // Now TypeScript recognizes 'uri' property
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create Post
      </ThemedText>
      
      {/* Text Input for Post Content */}
      <TextInput
        style={styles.textInput}
        placeholder="Write your post here..."
        value={postText}
        onChangeText={setPostText}
        multiline
      />
      
      {/* Image Upload */}
      {imageUri && (
        <ThemedView style={styles.imageContainer}>
          <ThemedText style={styles.imageText}>Selected Image:</ThemedText>
          <ThemedView style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
          </ThemedView>
        </ThemedView>
      )}
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <ThemedText style={styles.imageButtonText}>Pick an Image</ThemedText>
      </TouchableOpacity>
      
      {/* Text Posts */}
      <Collapsible title="Text Posts">
        <ThemedText>
          Write and share text-based posts to communicate thoughts and updates.
        </ThemedText>
      </Collapsible>
      
      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <ThemedText style={styles.postButtonText}>Post</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    minHeight: 100, // Minimum height for the text input
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  imageText: {
    marginBottom: 8,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  imageButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  postButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
