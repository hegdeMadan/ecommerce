import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={moderateScale(28)} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
