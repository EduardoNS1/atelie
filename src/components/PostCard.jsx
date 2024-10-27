import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment-timezone';

const PostCard = ({ title, creator, avatar, thumbnail, description, createdAt }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(1);

  const onImageLoad = (event) => {
    const { source } = event.nativeEvent;
    if (source?.width && source?.height) {
      setImageRatio(source.height / source.width);
      setImageLoaded(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <LinearGradient
                colors={['#FF6B6B', '#FF8E53']}
                style={styles.avatarPlaceholder}
              >
                <Text style={styles.avatarText}>
                  {creator?.[0]?.toUpperCase()}
                </Text>
              </LinearGradient>
            )}
            <View style={styles.onlineIndicator} />
          </View>

          <View style={styles.userMetadata}>
            <Text style={styles.creator} numberOfLines={1}>
              {creator}
            </Text>
            <Text style={styles.timeText}>
              {moment.tz(createdAt, 'America/Sao_Paulo').format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
        </View>
      </View>

      {/* Image Section */}
      <View style={[
        styles.thumbnailContainer,
        { aspectRatio: imageRatio > 1.25 ? 1080/1350 : 1 }
      ]}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          onLoad={onImageLoad}
        />
        {!imageLoaded && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
          </View>
        )}
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.descriptionContainer}>
          <Text 
            style={styles.description}
            numberOfLines={expanded ? undefined : 3}
          >
            {description}
          </Text>
          {description?.length > 200 && (
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

        <View style={styles.interactionBar}>
          <View style={styles.stats}>
            <Text style={styles.statsText}>2.5k visualizações</Text>
            <Text style={styles.statsText}>•</Text>
            <Text style={styles.statsText}>142 comentários</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userMetadata: {
    marginLeft: 12,
  },
  creator: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  timeText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  followButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  thumbnailContainer: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    position: 'relative',
    overflow: 'hidden',
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
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#4A4A4A',
    lineHeight: 22,
  },
  expandButton: {
    marginTop: 8,
  },
  expandButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 13,
    color: '#666666',
    marginRight: 8,
  },
});

export default PostCard;