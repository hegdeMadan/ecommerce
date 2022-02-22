import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Component/Loader';
import { BASE_URL } from '../constants';
import { screens } from '../navigator/constants';

const Category = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/categories/`);
        console.log('categories res: ', response);
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItemWrapper}
        onPress={() =>
          navigation.navigate(screens.CATEGORY_PRODUCTS, { category: item })
        }>
        <Text style={styles.categoryItem}>{item}</Text>
        <Icon name="arrow-forward" color="#333" size={moderateScale(16)} />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <Text style={styles.title}>Category</Text>
      <FlatList
        data={categories}
        renderItem={_renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
  categoryItemWrapper: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryItem: {
    color: '#333',
    fontSize: moderateScale(20),
  },
});

export default Category;
