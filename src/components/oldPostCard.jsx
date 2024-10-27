import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";

const PostCard = ({ title, creator, avatar, thumbnail, description, datetime }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(1); // 1:1 por padrão

  // Função para verificar as dimensões da imagem
  const onImageLoad = (event) => {
    const { source } = event.nativeEvent;
  
    if (source && source.width && source.height) {
      const { width, height } = source;
      const ratio = height / width;
      setImageRatio(ratio);
      setImageLoaded(true);
    } else {
      console.warn('O evento de carregamento da imagem não contém as dimensões da fonte');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com Avatar e Informações */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{creator?.[0]?.toUpperCase()}</Text>
              </View>
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.creator} numberOfLines={1}>
              {creator}
            </Text>
            <Text style={styles.timeText}>{new Date(datetime).toLocaleDateString()}</Text>
          </View>
        </View>
      </View>

      {/* Thumbnail com proporção ajustável */}
      <View style={[
        styles.thumbnailContainer,
        { aspectRatio: imageRatio > 1.25 ? 1080/1350 : 1 } // 1080:1350 para vertical, 1:1 para quadrado
      ]}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          onLoad={onImageLoad}
        />
        {!imageLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#666" />
          </View>
        )}
      </View>

      {/* Conteúdo do Post */}
      <View style={styles.contentContainer}>

        {/* Título e Legenda */}
        <View style={styles.textContent}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>

          <Text 
            style={styles.prompt}
            numberOfLines={expanded ? undefined : 2}
          >
            {description}
          </Text>
          {description?.length > 100 && (
            <TouchableOpacity 
              onPress={() => setExpanded(!expanded)}
              style={styles.expandButton}
            >
              <Text style={styles.expandButtonText}>
                {expanded ? 'Ver menos' : 'Ver mais'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  textContainer: {
    marginLeft: 12,
  },
  creator: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  menuButton: {
    padding: 4,
  },
  thumbnailContainer: {
    width: '100%',
    backgroundColor: '#FFFF',
    position: 'relative',
    padding: 10,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  contentContainer: {
    marginLeft: 10,
    marginRight: 14
  },
  interactionBar: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  textContent: {
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  prompt: {
    paddingBottom: 15,
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
  },
  expandButton: {
    marginTop: 4,
    paddingVertical: 4,
  },
  expandButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PostCard;