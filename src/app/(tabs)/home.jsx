import React, { useState } from 'react'
import { StyleSheet, Image, RefreshControl, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { images } from '../../constants'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const {user, setUser} = useGlobalContext()

  const {data: posts, refetch} = useAppwrite(getAllPosts)
  const {data: latestPosts} = useAppwrite(getLatestPosts)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

    return (
      <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.welcomeText}>Bem-vindo</Text>
                <Text style={styles.usernameText}>{user?.username}</Text>
              </View>

              <View style={styles.logoContainer}>
                <Image
                  source={images.logoSmall}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View style={styles.latestVideosContainer}>
              <Text style={styles.latestVideosText}>Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Exemplo de cor primária
  },
  headerContainer: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 16,
    spaceY: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#d1d5db', // Exemplo de cor para texto cinza
  },
  usernameText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff', // Cor do nome de usuário
  },
  logoContainer: {
    marginTop: 6,
  },
  logo: {
    width: 36,
    height: 40,
  },
  latestVideosContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 32,
  },
  latestVideosText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#d1d5db', // Exemplo de cor para texto cinza
    marginBottom: 12,
  },
});

export default Home
