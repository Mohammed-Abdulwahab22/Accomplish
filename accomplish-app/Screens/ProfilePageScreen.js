import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFollow, setFollowersCount, setFollowingCount, setModalVisible, setSelectedPost,setPosts,setprofileName,setprofileImage,setprofileBio } from '../context/reducers/profilePageReducer';
export default function ProfileScreen({route}) {
  const { isFollowed, followersCount, followingCount, modalVisible, selectedPost,posts, profileName, profileImage, profileBio } = useSelector(state => state.profilePage);
  const dispatch = useDispatch();

  const handleToggleFollow = () => {
    dispatch(toggleFollow());
    dispatch(setFollowersCount(isFollowed ? followersCount + 1 : followersCount - 1));

  };

  const getInfo = async () => {
  var userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    dispatch(setprofileName(userInfo.data.name));

  }

  }

  useEffect(() => {
    getInfo();
  }, [profileName]);


  const { setIsLoggedIn } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const renderItem = ({ item }) => (

    <TouchableOpacity style={[styles.postCard, { backgroundColor: '#B644DA' }]} onPress={() => { dispatch(setSelectedPost(item)); dispatch(setModalVisible(modalVisible)); }}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/5d709da8-cbe2-4ac7-a9f6-8f127662e86c.jpeg')} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          <Text style={styles.nameText}>{profileName}</Text>
          <Text style={styles.titleText}>Software Developer</Text>
          <TouchableOpacity  onPress={handleLogout} style={styles.logoutButton}>
            <Image source={require('../assets/logout.png')} style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.infoContainer}>
        <View style={styles.followersFollowingContainer}>
          <View style={styles.followersFollowing}>
            <Text style={styles.followText}>Followers: {followersCount}</Text>
          </View>
          <View style={styles.followersFollowing}>
            <Text style={styles.followText}>Following: {followingCount}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.followButton} onPress={handleToggleFollow}>
          {isFollowed ? (
            <SimpleLineIcons name="user-follow" size={24} color="red" />
          ) : (
            <SimpleLineIcons name="user-following" size={24} color="green" />
          )}
        </TouchableOpacity>
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
        onRequestClose={() => { dispatch(setModalVisible(false)); }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPost?.title}</Text>
            <Text style={styles.modalText}>{selectedPost?.content}</Text>
            <TouchableOpacity onPress={() => dispatch(setModalVisible(modalVisible))} style={styles.closeButton}>
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
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: -60,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 7,
  },
  logoutIcon: {
    width: 30,
    height: 30,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3a3a74',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    marginBottom: 20,
  },
  followersFollowingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersFollowing: {
    marginRight: 20,
  },
  followText: {
    fontSize: 16,
    color: 'white',
  },
  followButton: {
    backgroundColor: '#262450',
    borderRadius: 20,
    padding: 10,
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
    alignItems: 'center',
    paddingBottom: 100,
  },
  postCard: {
    width: 350,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 5,
  },

  postImage: {
    width: '100%',
    height: 150,
  },
  postDetails: {
    padding: 20,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
    color: 'white',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
