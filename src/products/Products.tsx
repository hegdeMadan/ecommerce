import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
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
import { getStarColor } from './constants';

const Products = ({ navigation, route, hideHeader }) => {
  console.log(route);
  const [isLoading, setLoading] = useState(true);
  /**
   * use filteredProducts as default list so that when search is performed,
   * we will still have access to all products in originalProductList.
   * otherwise when user clears his search input we will only have filtered array and
   * we will have to call api to get the original data back.
   */
  const [originalProductList, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProduct] = useState([]);

  const [isTyping, setTyping] = useState(false);
  const category = route?.params?.category;
  const uri = category
    ? `${BASE_URL}products/category/${category}`
    : `${BASE_URL}products`;
  let timeoutInstance;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(uri);
        console.log('Product res: ', response);
        if (response.status === 200) {
          setOriginalProducts(response.data);
          setFilteredProduct(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, [route?.params?.category]);

  const filterProducts = val => {
    setTyping(true);
    // using debnounce technique for better performance
    if (timeoutInstance) {
      clearTimeout(timeoutInstance);
    }
    timeoutInstance = setTimeout(() => {
      const filteredArr = originalProductList.filter(item => {
        console.log(item, val);
        return item?.title.includes(val) || item?.description.includes(val);
      });
      console.log(filteredArr);
      setFilteredProduct(filteredArr);
      setTyping(false);
    }, 700);
  };

  const _renderItem = ({ item, index }) => {
    const {
      id,
      title,
      rating: { rate, count },
      image,
      price,
    } = item;
    return (
      <TouchableOpacity
        style={styles.productWrapper}
        onPress={() =>
          navigation.navigate(screens.PRODUCT_DETAILS, { productId: id })
        }>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{title}</Text>
          <View style={styles.ratingSection}>
            <Icon
              name="star"
              size={moderateScale(16)}
              color={getStarColor(rate)}
            />
            <Text style={styles.rate}>{rate}</Text>
            <Text>({count})</Text>
          </View>
          <Text style={styles.price}>₹{price}</Text>
          <TouchableOpacity style={styles.addToCart}>
            <Text>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <View style={styles.header}>
        <TextInput
          placeholder="search title or description"
          style={styles.input}
          onChangeText={val => filterProducts(val)}
        />
        {isTyping ? (
          <ActivityIndicator />
        ) : (
          <Icon name="search" size={moderateScale(20)} color="#000" />
        )}
      </View>
      {filteredProducts.length ? (
        <FlatList
          data={filteredProducts}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: moderateScale(160) }}
        />
      ) : (
        <Text>No product found!</Text>
      )}
      <View style={{ width: '100%', height: moderateScale(100) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  productWrapper: {
    width: '100%',
    height: moderateVerticalScale(136),
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    flexDirection: 'row',
    padding: moderateScale(12),
  },
  productInfo: {
    flex: 1,
    marginLeft: moderateScale(12),
  },
  productName: {
    color: '#000',
    // flex: 1,
    // flexWrap: 'wrap',
  },
  image: {
    width: '25%',
    height: '80%',
    resizeMode: 'contain',
    marginRight: moderateScale(12),
    padding: moderateScale(8),
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(4),
  },
  rate: {
    marginRight: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  price: {
    color: '#000',
    fontSize: moderateScale(16),
  },
  addToCart: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    alignSelf: 'flex-end',
  },
  header: {
    width: '90%',
    height: moderateScale(52),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    margin: moderateScale(8),
    paddingHorizontal: moderateScale(16),
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: moderateScale(12),
  },
  input: {
    flex: 1,
  },
});

export default Products;
