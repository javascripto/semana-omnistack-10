import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';


export function Main({ navigation: { navigate } }) {
  const [currentRegion, setCurrentRegion] = useState(null);

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
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}>
        <Marker
          coordinate={{ latitude: -23.6493986, longitude: -46.7730587 }}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://avatars3.githubusercontent.com/u/16804522?s=460&v=4'}}
          />
          <Callout onPress={() => navigate('Profile', { github_username: 'javascripto' })}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Yuri Almeida</Text>
              <Text style={styles.devBio}>Não Tenho Bio aqui</Text>
              <Text style={styles.devTechs}>Angular, Node.js, ReactJS, PHP, Python, Kotlin</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchForm}></View>
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

  }
})
