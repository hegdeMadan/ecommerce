import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../Component/Loader';
import { BASE_URL } from '../constants';
import { getStarColor } from './constants';

const ProductDetails = ({ navigation, route }) => {
  console.log(route);
  const [isLoading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/products/${route.params.productId}`,
        );
        console.log('Productdetails res: ', response);
        if (response.status === 200) {
          setProductDetails(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (productDetails) {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={moderateScale(24)}
            color="#333"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Products</Text>
        </View>
        <View style={styles.productDetails}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: productDetails.image }}
              style={styles.image}
            />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{productDetails.title}</Text>
            <View style={styles.ratingSection}>
              <Icon
                name="star"
                size={moderateScale(16)}
                color={getStarColor(productDetails.rating.rate)}
              />
              <Text style={styles.rating}>{productDetails?.rating?.rate}</Text>
              <Text style={styles.ratingCount}>
                ({productDetails?.rating?.count})
              </Text>
            </View>
            <Text>{productDetails.description}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>no information available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateVerticalScale(12),
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: moderateScale(24),
    color: '#000',
  },
  backIcon: {
    marginHorizontal: moderateScale(8),
  },
  productDetails: {
    padding: moderateScale(12),
  },
  imageWrapper: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: moderateVerticalScale(8),
  },
  image: {
    width: '100%',
    height: moderateVerticalScale(360),
    resizeMode: 'contain',
  },
  productInfo: {
    margin: moderateScale(12),
  },
  productTitle: {
    color: '#000',
    fontSize: moderateScale(18),
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(4),
  },
  rating: {},
  ratingCount: {},
});

export default ProductDetails;
