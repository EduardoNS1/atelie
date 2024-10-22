import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import useAppwrite from '../../lib/useAppwrite';
import { getAllArticles } from '../../lib/appwrite';

// Obtém a largura da tela para cálculos responsivos
const { width } = Dimensions.get('window');

const ArticleList = () => {
  const {data: articles} = useAppwrite(getAllArticles);

  // Função para renderizar cada item da lista
  const renderArticle = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.articleContainer}
        onPress={() => {
          // Adicione aqui a navegação para a tela de detalhes do artigo
          console.log('Artigo selecionado:', item.title);
        }}
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
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.metaText}>{item.readTime}</Text>
              </View>
            </View>
          </View>

          {/* Conteúdo do artigo */}
          <Text style={styles.content} numberOfLines={3}>
            {item.content}
          </Text>

          {/* Imagem do artigo (se existir) */}
          {item.image && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
                // Tratamento de loading e erro
                loadingIndicatorSource={<ActivityIndicator />}
                onError={(error) => console.log('Erro ao carregar imagem:', error)}
              />
            </View>
          )}
        </View>

        {/* Botão "Ler mais" */}
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>Ler mais</Text>
          <Feather name="chevron-right" size={16} color="#0066CC" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // Pull to refresh
      onRefresh={() => {
        // Implemente a lógica de refresh
        console.log('Atualizando lista...');
      }}
      refreshing={false}
      // Loading inicial
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Feather name="inbox" size={48} color="#666" />
          <Text style={styles.emptyText}>Nenhum artigo encontrado</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Espaço para o tab navigator
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
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
    color: '#0066CC',
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