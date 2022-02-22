import * as React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = { focused: boolean; color: string };

export const HomeIcon = ({ focused, color }: Props) => {
  return (
    <MaterialIcon
      name={focused ? 'home' : 'home-outline'}
      color={color}
      size={32}
    />
  );
};

export const ProfileIcon = ({ focused, color }: Props) => {
  return (
    <IonIcon
      name={focused ? 'person' : 'person-outline'}
      color={color}
      size={28}
    />
  );
};

export const CartIcon = ({ focused, color }: Props) => {
  return (
    <IonIcon name={focused ? 'cart' : 'cart-outline'} color={color} size={28} />
  );
};

export const ProductsIcon = ({ focused, color }: Props) => {
  return (
    <IonIcon name={focused ? 'grid' : 'grid-outline'} color={color} size={28} />
  );
};
