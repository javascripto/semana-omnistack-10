import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import { Dev } from '../models/dev';
import { api } from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';


export function Main({ navigation: { navigate } }) {
  const [currentRegion, setCurrentRegion] = useState<Region>(null);
  const [devs, setDevs] = useState<Dev[]>([]);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords: { latitude, longitude} } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        });
      }
    }
    loadInitialPosition();
    loadAllDevs();
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]))
  }, [devs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion || {};
    connect(
      latitude,
      longitude,
      techs,
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get<{ devs: Dev[] }>('/search', {
      params: { techs, latitude, longitude }
    });

    setDevs(response.data.devs);
    setupWebsocket();
  }

  async function loadAllDevs() {
    const { data } = await api.get<Dev[]>('/devs');
    setDevs(data);
  }

  function handleRegionChanged(region: Region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChanged}>
        {devs.map(({
          _id, name, avatar_url,
          bio, github_username, techs,
          location: { coordinates: [longitude, latitude]
        }}) => (
          <Marker
            key={_id}
            coordinate={{ latitude, longitude }}>
            <Image
              style={styles.avatar}
              source={{ uri: avatar_url}}
            />
            <Callout onPress={() => navigate('Profile', { github_username })}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{name}</Text>
                <Text style={styles.devBio}>{bio}</Text>
                <Text style={styles.devTechs}>{techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        )
      )}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          value={techs}
          autoCorrect={false}
          autoCapitalize="words"
          onChangeText={setTechs}
          style={styles.searchInput}
          placeholderTextColor="#999"
          placeholder="Buscar devs por techs..."
        />
        <TouchableOpacity
          onPress={loadDevs}
          style={styles.loadButton}>
          <MaterialIcons
            size={20}
            color="#fff"
            name="my-location"
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 1,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8d4eff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
