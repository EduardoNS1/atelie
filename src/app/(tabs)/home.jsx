import React, { useState } from 'react'
import { StyleSheet, RefreshControl, Text, View, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Feather } from '@expo/vector-icons'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SearchInput, PostCard } from '../../components';

const Home = () => {
  const { user } = useGlobalContext()
  const {data: posts, refetch} = useAppwrite(getAllPosts)
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
          <PostCard
            avatar={item.creator.avatar}
            creator={item.creator.username}
            createdAt={item.$createdAt}
            thumbnail={item.thumbnail}
            title={item.title}
            description={item.description}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            {/* Header com Saudação e Logo */}
            <View style={styles.headerContent}>
              <View style={styles.greetingContainer}>
                <Text style={styles.welcomeText}>Bem-vindo de volta,</Text>
                <Text style={styles.usernameText}>{user?.username}</Text>
              </View>
              {/* <View style={styles.logoContainer}>
              </View> */}
            </View>

            {/* Barra de Pesquisa com Ícone */}
            <View style={styles.searchContainer}>
              <SearchInput />
            </View>

            {/* Separador para Feed Principal */}
            <View style={styles.feedHeader}>
              <Text style={styles.feedTitle}>Explorar publicações</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#666" />
            <Text style={styles.emptyText}>Nenhum post encontrado</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#f5f5f5',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  welcomeText: {
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  usernameText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1A1A',
  },
  logoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 32,
    height: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1A1A',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  feedTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  feedDivider: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    width: '100%',
  },
});

export default Home