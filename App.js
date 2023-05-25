import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const [mlat, setmlat] = useState(0);
  const [mlng, setmlng] = useState(0);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const getlocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setmlat(position.coords.latitude);
        setmlng(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width: '100%', height: '70%'}}
        initialRegion={{
          latitude: mlat,
          longitude: mlng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker coordinate={{latitude: mlat, longitude: mlng}} />
      </MapView>

      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          position: 'absolute',
          bottom: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        onPress={() => {
          getlocation();
        }}>
        <Text>My Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
