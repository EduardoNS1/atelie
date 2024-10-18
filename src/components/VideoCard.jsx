import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.creator} numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>

        <View style={styles.menuIcon}>
          <Image source={icons.menu} style={styles.menuImage} resizeMode="contain" />
        </View>
      </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={styles.thumbnailContainer}
        >
          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderColor: '#yourSecondaryColor', // Substitua pelo valor de sua cor secundária
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  infoContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    color: '#fff', // Cor do texto
    fontWeight: '600', // Ajuste conforme seu tema
  },
  creator: {
    fontSize: 12,
    color: '#ccc', // Cor do texto
    fontWeight: '400', // Ajuste conforme seu tema
  },
  menuIcon: {
    paddingTop: 8,
  },
  menuImage: {
    width: 20,
    height: 20,
  },
  video: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
  },
  thumbnailContainer: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  playIcon: {
    width: 48,
    height: 48,
    position: 'absolute',
  },
});

export default VideoCard;
