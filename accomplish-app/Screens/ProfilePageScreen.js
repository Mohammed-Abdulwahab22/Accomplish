import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../assets/5d709da8-cbe2-4ac7-a9f6-8f127662e86c.jpeg')}
            />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>

          <View style={styles.followContainer}>
            <Text style={styles.followText}>Following: 100</Text>
            <View style={styles.line} />
            <Text style={styles.followText}>Followers: 200</Text>
          </View>
        </View>

    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
  },
  profileContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileInfo: {
    flex: 1,
  },
  imageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  followContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  followText: {
    fontSize: 16,
    marginRight: 20,
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  flatListContainer: {
    flex: 1,
    marginLeft: 20,
  },

});
