import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileHeader = ({ user, posts, onLogout }) => {
  return (
    <View style={styles.container}>
      {/* Header com logout */}
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Feather name="log-out" size={28} color="#262626" />
      </TouchableOpacity>

      {/* Seção principal do perfil */}
      <View style={styles.profileSection}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Feather name="user" size={44} color="#666" />
            </View>
          )}
        </View>

        {/* Informações do usuário */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user?.username}</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statNumber}>{posts?.length || 0}</Text>
            <Text style={styles.statLabel}> publicações</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  avatarContainer: {
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#262626',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#262626',
  },
  statLabel: {
    fontSize: 15,
    color: '#262626',
  },
});

export default ProfileHeader;