import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather } from '@expo/vector-icons';
import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { SearchInput, PostCard } from "../../components";
 
const Search = () => {
  const { query } = useLocalSearchParams(); // Obtém a query de busca dos parâmetros locais
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query)); // Busca os posts usando a query

  useEffect(() => {
    refetch(); // Refaz a busca sempre que a query muda
  }, [query]); // Executa o efeito sempre que a query mudar

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.resultsText}>Search Results</Text>
              <Text style={styles.queryText}>{query}</Text>

              <View style={styles.searchInputContainer}>
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#666" />
            <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>

        </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1A1A1A',
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontFamily: 'Poppins-Medium',
    color: '#D1D1D1',
    fontSize: 14,
  },
  queryText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  searchInputContainer: {
    marginTop: 24,
    marginBottom: 32,
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
    textAlign: 'center',
  },
});

export default Search;
