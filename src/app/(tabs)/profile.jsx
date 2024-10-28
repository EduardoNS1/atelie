import React, { useState } from 'react';
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";

import { Feather } from '@expo/vector-icons';
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut, deletePost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { InfoBox, PostCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts = [], refetch, loading } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  const handleDeletePost = async (postId) => {
    Alert.alert(
      "Excluir post",
      "Tem certeza que deseja excluir este post?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(postId, user.$id);
              // Atualiza a lista de posts após a exclusão
              refetch();
              Alert.alert("Sucesso", "Post excluído com sucesso");
            } catch (error) {
              Alert.alert("Erro", error.message || "Não foi possível excluir o post");
              console.error("Delete Error:", error);
            }
          }
        }
      ]
    );
  };

  const renderPost = ({ item }) => {
    // Console log para debug
    console.log("Post Creator:", item.creator);
    console.log("Current User:", user);
    
    return (
      <View style={styles.postContainer}>
        <PostCard
          avatar={item.creator.avatar}
          creator={item.creator.username}
          createdAt={item.$createdAt}
          thumbnail={item.thumbnail}
          title={item.title}
          description={item.description}
        />
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeletePost(item.$id)}
        >
          <Feather name="trash-2" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
<SafeAreaView style={styles.safeAreaView}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E0E0E0" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={renderPost}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Feather name="inbox" size={48} color="#666" />
              <Text style={styles.emptyText}>Nenhum post encontrado</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={logout}
              style={styles.logoutButton}
            >
              <Feather name="log-out" size={28} color="#666" />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={styles.infoBoxContainer}
              titleStyles={styles.infoBoxTitle}
            />

            <View style={styles.statsContainer}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles={styles.infoBoxTitle}
                containerStyles={styles.postsContainer}
              />
            </View>
          </View>
          )}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
 safeAreaView: {
   flex: 1,
   backgroundColor: '#f5f5f5',
 },
 contentContainer: {
   paddingBottom: 60,
 },  
 headerContainer: {
   width: '100%',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 6,
   marginBottom: 12,
   paddingHorizontal: 16,
 },
 logoutButton: {
   width: '100%',
   alignItems: 'flex-end',
   marginTop: 10,
   marginBottom: 10,
 },
 avatarContainer: {
   width: 64,
   height: 64,
   borderColor: '#yourSecondaryColor',
   borderWidth: 1,
   borderRadius: 12,
   justifyContent: 'center',
   alignItems: 'center',
 },
 avatar: {
   width: '90%',
   height: '90%',
   borderRadius: 12,
 },
 infoBoxContainer: {
   marginTop: 5,
 },
 infoBoxTitle: {
   fontSize: 18,
 },
 statsContainer: {
   marginTop: 5,
   flexDirection: 'row',
 },
 postsContainer: {
   marginRight: 10,
 },
 emptyContainer: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 32,
   gap: 16,
 },
 emptyText: {
   fontSize: 16,
   color: '#666',
 },
 postContainer: {
   position: 'relative',
   marginBottom: 16,
 },
 deleteButton: {
   position: 'absolute',
   top: 10,
   right: 10,
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   padding: 8,
   borderRadius: 20,
   elevation: 2,
   shadowColor: "#000",
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
 },
 loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5F5F5', // A beautiful blue background
  padding: 20,
  borderRadius: 10,
  shadowColor: '#000', // Add shadow for depth
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5, // For Android shadow
},
loadingText: {
  marginTop: 15,
  fontSize: 18,
  color: '#ffffff', // Change text color to white
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default Profile;