import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal } from 'react-native';

export default function ProfileScreen() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    { id: '1', title: 'Post 1', content: 'This is the content of post 1.' },
    { id: '2', title: 'Post 2', content: 'This is the content of post 2.' },
    { id: '3', title: 'Post 3', content: 'This is the content of post 3.' },
  ];

  const getRandomColor = () => {
    const colors = ['#8B0000', '#FF8C00', '#FFD700', '#008000', '#00CED1', '#1E90FF', '#8A2BE2', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.postCard, { backgroundColor: getRandomColor() }]} onPress={() => { setSelectedPost(item); setModalVisible(true); }}>
      <View style={styles.postItem}>
        <Text style={styles.postTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/5d709da8-cbe2-4ac7-a9f6-8f127662e86c.jpeg')} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>Mohammed Abdulwahab</Text>
          <Text style={styles.titleText}>Software Developer</Text>
        </View>
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
        contentContainerStyle={styles.scrollContainer}
      />
      <Modal
        animationType='fade'
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
    flex: 1,
    backgroundColor: '#262450',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  titleText: {
    fontSize: 16,
    color: 'grey',
  },
  infoContainer: {
    backgroundColor: '#3a3a74',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: 'white',
  },
  flatList: {
    width: '100%',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  postCard: {
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginLeft: '5%',
  },
  postItem: {
    padding: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
});
