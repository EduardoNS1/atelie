import React, { useState } from 'react';
import { View, ScrollView, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment-timezone';
import useAppwrite from '../../lib/useAppwrite';
import { getAllArticles } from '../../lib/appwrite';
import { ArticleDetailModal } from '../../components';

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Consumo Consciente', label: 'Consumo Consciente' },
  { id: 'Impactos Ambientais', label: 'Impactos Ambientais' },
  { id: 'Condições de Trabalho', label: 'Condições de Trabalho' },
  { id: 'Economia', label: 'Economia' },
  { id: 'Tecnologia', label: 'Tecnologia' },
  { id: 'Brasil', label: 'Brasil' },
];

const ArticleList = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Buscar todos os artigos de uma vez
  const { data: allArticles = [], isLoading, refetch } = useAppwrite(() => getAllArticles([]));

  // Filtrar localmente baseado na categoria selecionada
  const filteredArticles = allArticles.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleArticlePress = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const CategoryButton = ({ category }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive
      ]}
      onPress={() => handleCategoryPress(category.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && styles.categoryButtonTextActive
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const renderArticle = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.articleContainer}
        onPress={() => handleArticlePress(item)}
      >
        <View style={styles.articleContent}>
          <View style={styles.headerContainer}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>
                {CATEGORIES.find(cat => cat.id === item.category)?.label || 'Geral'}
              </Text>
            </View>
            
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Feather name="calendar" size={14} color="#666" />
                <Text style={styles.metaText}>
                  {moment(item.$createdAt).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.metaText}>{item.readTime}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.content} numberOfLines={5}>
            {item.introduction}
          </Text>

          {item.thumbnail && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.image}
                resizeMode="cover"
                loadingIndicatorSource={<ActivityIndicator />}
                onError={(error) => console.log('Erro ao carregar imagem:', error)}
              />
            </View>
          )}
        </View>

        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Ler mais</Text>
          <Feather name="chevron-right" size={16} color="#ea88e6" />
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ea88e6" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {CATEGORIES.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#666" />
            <Text style={styles.emptyText}>Nenhum artigo encontrado nesta categoria</Text>
          </View>
        )}
      />

      <ArticleDetailModal
        article={selectedArticle}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoriesScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    minWidth: 80,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#ea88e6',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Medium'
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleContent: {
    gap: 12,
  },
  headerContainer: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10
    ,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: '#ea88e6',
    fontWeight: '500',
  },
  separator: {
    height: 16,
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

export default ArticleList;