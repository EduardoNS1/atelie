import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import useAppwrite from '../../lib/useAppwrite';
import { getAllArticles } from '../../lib/appwrite';
import ArticleDetailModal from '../../components/ArticleDetail';
import moment from 'moment-timezone';

const ArticleList = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {data: articles, refetch} = useAppwrite(getAllArticles);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  const handleArticlePress = (article) => {
    setSelectedArticle(article);
    setModalVisible(true);
  };

  const renderArticle = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.articleContainer}
        onPress={() => handleArticlePress(item)}
      >
        {/* Container principal do artigo */}
        <View style={styles.articleContent}>
          {/* Cabeçalho com título e metadados */}
          <View style={styles.headerContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Feather name="calendar" size={14} color="#666" />
                <Text style={styles.metaText}>
                  {moment.tz(item.$createdAt, 'America/Sao_Paulo').format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.metaText}>{item.readTime}</Text>
              </View>
            </View>
          </View>

          {/* Preview do conteúdo do artigo */}
          <Text style={styles.content} numberOfLines={5}>
            {item.introduction}
          </Text>

          {/* Imagem do artigo (se existir) */}
          {item.thumbnail && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.thumbnail}}
                style={styles.image}
                resizeMode="cover"
                loadingIndicatorSource={<ActivityIndicator />}
                onError={(error) => console.log('Erro ao carregar imagem:', error)}
              />
            </View>
          )}
        </View>

        {/* Botão "Ler mais" */}
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Ler mais</Text>
          <Feather name="chevron-right" size={16} color="#ea88e6" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={48} color="#666" />
            <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
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