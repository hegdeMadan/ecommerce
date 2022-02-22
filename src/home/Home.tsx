import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { screens } from '../navigator/constants';
import Products from '../products/Products';

const Home = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Home</Text>
      <Button
        title="Category"
        onPress={() => navigation.navigate(screens.CATEGORY)}
      />
      <Products navigation={navigation} route={route} hideHeader />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(28),
    color: '#000',
    padding: moderateVerticalScale(12),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  searchWrapper: {},
});

export default Home;
