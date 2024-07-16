import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Video } from 'expo-av';

interface VideoLink {
  title: string;
  url: string;
  likes: number;
  dislikes: number;
  comments: string[];
}

export default function VideosScreen() {
  const [videoLinks, setVideoLinks] = useState<VideoLink[]>([
    { title: 'User Stories', url: 'https://www.youtube.com/watch?v=JJBJtugy1YU', likes: 0, dislikes: 0, comments: [] },
    { title: 'Travel Vlogs', url: 'https://www.youtube.com/watch?v=PWirijQkH4M', likes: 0, dislikes: 0, comments: [] },
    // Add more video links as needed
  ]);
  const [commentText, setCommentText] = useState<string>('');

  const handleLike = (index: number) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index].likes += 1;
    updatedLinks[index].dislikes = Math.max(0, updatedLinks[index].dislikes - 1); // Ensure dislikes don't go below 0
    setVideoLinks(updatedLinks);
  };

  const handleDislike = (index: number) => {
    const updatedLinks = [...videoLinks];
    updatedLinks[index].dislikes += 1;
    updatedLinks[index].likes = Math.max(0, updatedLinks[index].likes - 1); // Ensure likes don't go below 0
    setVideoLinks(updatedLinks);
  };

  const handleComment = (index: number) => {
    if (commentText.trim().length > 0) {
      const updatedLinks = [...videoLinks];
      updatedLinks[index].comments.push(commentText);
      setVideoLinks(updatedLinks);
      setCommentText('');
      Alert.alert('Comment Added', 'Your comment has been successfully added.');
    } else {
      Alert.alert('Error', 'Please enter a comment.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0E0C0', dark: '#304030' }}
      headerImage={<Ionicons size={310} name="videocam-outline" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Videos</ThemedText>
      </ThemedView>

      {videoLinks.map((link, index) => (
        <View key={index} style={styles.videoContainer}>
          <ThemedText style={styles.videoTitle}>{link.title}</ThemedText>
          <Video
            source={{ uri: link.url }}
            style={styles.video}
            useNativeControls
          />
         
          <ExternalLink href={link.url}>
            <ThemedText type="link">Watch Now</ThemedText>
          </ExternalLink>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(index)}>
              <Ionicons name="thumbs-up-outline" size={24} color="#007AFF" />
              <ThemedText>{link.likes}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dislikeButton} onPress={() => handleDislike(index)}>
              <Ionicons name="thumbs-down-outline" size={24} color="#FF3B30" />
              <ThemedText>{link.dislikes}</ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.commentsHeader}>Comments:</ThemedText>
          {link.comments.map((comment, commentIndex) => (
            <ThemedText key={commentIndex} style={styles.commentText}>
              {comment}
            </ThemedText>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => handleComment(index)} style={styles.submitCommentButton}>
              <Ionicons name="send-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dislikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  commentText: {
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
  },
  submitCommentButton: {
    marginLeft: 10,
    padding: 5,
  },
});
