import React from 'react';
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";

import { Feather } from '@expo/vector-icons';
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut, deletePost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ProfileHeader, PostCard } from "../../components";

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
          <Feather name="trash-2" size={24} color="#131313" />
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
                <ProfileHeader 
                  user={user}
                  posts={posts}
                  onLogout={logout}
                />
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
   top: 28,
   right: 20,
   backgroundColor: 'rgba(255, 255, 255, 0.9)',
   padding: 8,
 },
 loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5F5F5',
  padding: 20,
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5,
},
loadingText: {
  marginTop: 15,
  fontSize: 18,
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default Profile;