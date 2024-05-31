import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../context/reducers/PublicTimLineReducer';

export default function PublicTimeLineScreen() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.publicTimeLine);
  
  // const posts = [
  //   { id: '1', title: 'Post 1', content: 'This is the content of post 1.', image: 'https://via.placeholder.com/150' },
  //   { id: '2', title: 'Post 2', content: 'This is the content of post 2.', image: 'https://via.placeholder.com/150' },
  //   { id: '3', title: 'Post 3', content: 'This is the content of post 3.', image: 'https://via.placeholder.com/150' },
  // ];

 
  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.postCard, { backgroundColor: '#B644DA' }]}>
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
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>Public Timeline</Text>
      </View> */}
      <View style={styles.posts}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      </View>
      <TouchableOpacity style={styles.postButton}>
          <Entypo name="pencil" size={35} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262450',
  },
  // header: {
  //   width: '100%',
  //   padding: 20,
  //   backgroundColor: '#1E1C3C',
  //   alignItems: 'center',
  //   marginTop: 20,
  // },
  // headerTitle: {
  //   fontSize: 24,
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  postButton: {
    position: 'absolute',
    bottom: "15%", 
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,

  },
  flatListContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  postCard: {
    width: 380,
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
  posts: {
    marginTop: '10%',
  }
});
