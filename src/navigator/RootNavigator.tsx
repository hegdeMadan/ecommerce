import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { moderateScale } from 'react-native-size-matters';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { screens } from './constants';
import Home from '../home/Home';
import { CartIcon, HomeIcon, ProductsIcon, ProfileIcon } from './TabBarIcons';
import Products from '../products/Products';
import Profile from '../profile/Profile';
import Cart from '../cart/Cart';
import Category from '../categories/Categories';
import { StatusBar } from 'react-native';
import ProductDetails from '../products/ProductDetails';

export default function RootNavigator() {
  const { Navigator, Screen } = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTab = () => {
    return (
      <Tab.Navigator
        initialRouteName={screens.HOME}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: moderateScale(52),
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name={screens.HOME}
          component={Home}
          options={{
            tabBarIcon: HomeIcon,
          }}
        />

        <Tab.Screen
          name={screens.ALL_PRODUCTS}
          component={Products}
          options={{
            tabBarIcon: ProductsIcon,
            unmountOnBlur: true,
          }}
        />

        <Tab.Screen
          name={screens.PROFILE}
          component={Profile}
          options={{
            tabBarIcon: ProfileIcon,
          }}
        />

        <Tab.Screen
          name={screens.CART}
          component={Cart}
          options={{
            tabBarIcon: CartIcon,
          }}
        />
      </Tab.Navigator>
    );
  };

  const navigationDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: '#333',
      background: '#fff',
    },
  };

  const initalRouteName = screens.DASHBOARD;

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavigationContainer theme={navigationDefaultTheme}>
        <Navigator
          initialRouteName={initalRouteName}
          screenOptions={{ headerShown: false }}>
          <Screen name={screens.DASHBOARD} component={BottomTab} />
          <Screen name={screens.CATEGORY} component={Category} />
          <Screen name={screens.PRODUCT_DETAILS} component={ProductDetails} />
          <Screen name={screens.CATEGORY_PRODUCTS} component={Products} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
