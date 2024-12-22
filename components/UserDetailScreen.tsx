import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserDetailScreen = ({ route }: any) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.picture.large }} style={styles.image} />
      <Text style={styles.name}>{user.name.first} {user.name.last}</Text>
      <Text style={styles.info}>Gender: {user.gender}</Text>
      <Text style={styles.info}>Country: {user.location.country}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Phone: {user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default UserDetailScreen;
