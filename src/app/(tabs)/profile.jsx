import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from '@expo/vector-icons';
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import PostCard from "../../components/PostCard";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            description={item.description}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
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
});

export default Profile;
