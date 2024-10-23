import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ArticleDetailModal = ({ article, visible, onClose }) => {
  if (!article) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      statusBarTransition="fade"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        {/* Header Fixo */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Conteúdo Scrollável */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Imagem do artigo */}
          {article.thumbnail && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: article.thumbnail }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Conteúdo do Artigo */}
          <View style={styles.contentContainer}>
            {/* Metadata */}
            <View style={styles.metaInfo}>
              <View style={styles.metaItem}>
                <Feather name="calendar" size={14} color="#666" />
                <Text style={styles.metaText}>
                  {new Date(article.datetime).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Feather name="clock" size={14} color="#666" />
                <Text style={styles.metaText}>{article.readTime}</Text>
              </View>
            </View>

            {/* Título */}
            <Text style={styles.title}>{article.title}</Text>

            {/* Conteúdo Principal */}
            <Text style={styles.content}>{article.content}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 36,
  },
  content: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
    lineHeight: 28,
  },
});

export default ArticleDetailModal;