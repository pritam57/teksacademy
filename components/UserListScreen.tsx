import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, RefreshControl, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { fetchData } from '../Redux/action';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Name {
  first: string;
  last: string;
}

interface User {
  name: Name;
  gender: string;
  location: {
    country: string;
  };
}

const UserListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [selectedCountryname, setselectedCountryname] = useState<string>('All');
  const [isRefreshingUser, setisRefreshingUser] = useState(false);
  const [page, setPage] = useState(1);
  const [isOnlineuser, setisOnlineuser] = useState(true);

  
  const apidata = useSelector((state: any) => state.worddata);
  const isLoading = useSelector((state: any) => state.isLoading);

  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setisOnlineuser(state.isConnected); 
    });

    return () => unsubscribe(); 
  }, []);


  useEffect(() => {
    const loadData = async () => {
      if (isOnlineuser) {
        dispatch(fetchData(page)); 
      } else {
        const cachedData = await AsyncStorage.getItem('user_data');
        if (cachedData) {
          dispatch({ type: 'SET_WORD_DATA', payload: JSON.parse(cachedData) });
          Alert.alert("You are offline", "Showing saved data from the cache."); 
        } else {
          Alert.alert("No internet", "showing saved data, you are offline.");
        }
      }
    };

    loadData();
  }, [dispatch, page, isOnlineuser]);

  const onRefresh = useCallback(() => {
    setPage(1); 
    setisRefreshingUser(true);
    dispatch(fetchData(1)); 
    setisRefreshingUser(false);
  }, [dispatch]);

  const loadMoreData = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  const filterUsersByCountry = (users: User[], country: string) => {
    if (country === 'All') {
      return users;
    }
    return users.filter(user => user.location.country === country);
  };

  const getUniqueCountries = (users: User[]) => {
    const countries = users.map(user => user.location.country);
    return ['All', ...new Set(countries)];
  };

  
  const filteredData = filterUsersByCountry(apidata || [], selectedCountryname);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User List</Text>

    
      <Picker
        selectedValue={selectedCountryname}
        onValueChange={(itemValue) => setselectedCountryname(itemValue)}
        style={styles.picker}
      >
        {getUniqueCountries(apidata || []).map((country, index) => (
          <Picker.Item key={index} label={country} value={country} />
        ))}
      </Picker>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { user: item })}>
            <View style={styles.item}>
              <Text style={styles.text}>{item.name.first} {item.name.last}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingUser}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  picker: {
    height: 50,
    marginVertical: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
});

export default UserListScreen;
