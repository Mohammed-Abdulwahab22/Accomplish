import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
    if (isFollowed) {
      setFollowersCount(prevCount => prevCount - 1);
    } else {
      setFollowersCount(prevCount => prevCount + 1);
    }
  };

  const posts = [
    { id: '1', title: 'Post 1', content: 'This is the content of post 1.' },
    { id: '2', title: 'Post 2', content: 'This is the content of post 2.' },
    { id: '3', title: 'Post 3', content: 'This is the content of post 3.' },
    // Add more posts as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setSelectedPost(item); setModalVisible(true); }}>
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.followCounts}>
          <Text style={styles.followText}>Following: {followingCount}</Text>
          <Text style={styles.followText}>Followers: {followersCount}</Text>
        </View>
        <Image source={require('../assets/5d709da8-cbe2-4ac7-a9f6-8f127662e86c.jpeg')} style={styles.profilePicture} />
        <View style={styles.FollowButton}>
          <TouchableOpacity onPress={toggleFollow}>
            <SimpleLineIcons
              name={isFollowed ? "user-following" : "user-follow"}
              size={24}
              color={isFollowed ? "black" : "red"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>Mohammed Abdulwahab</Text>
        <Text style={styles.titleText}>Software Developer</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Bio</Text>
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(false); }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPost?.title}</Text>
            <Text style={styles.modalText}>{selectedPost?.content}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 25,
    flex: 1,
    backgroundColor: '#F0F1F6',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    margin: 20,
  },
  followCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  followText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#888',
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
  },
  flatList: {
    width: '100%',
  },
  postItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  FollowButton: {
    bottom: 8,
    left: 35,
  },
});
