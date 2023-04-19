import {View, Text} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const Searchplaces = () => {
  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyCdmIHvKSHu-vKEeN0hcvjQrOtr8row6qE',
          language: 'en',
        }}
      />
    </View>
  );
};

export default Searchplaces;
