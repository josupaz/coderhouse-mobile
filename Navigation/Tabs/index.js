import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from '../Stacks/Shop';
import CartStack from '../Stacks/Cart';
import OrderStack from '../Stacks/Orders';
import { Image } from "react-native";
import { colors } from '../../Styles/colors';

const Tab = createBottomTabNavigator();

const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarStyle:{
      backgroundColor: colors.primary,
      height:80,
    },
    tabBarItemStyle:{
      backgroundColor: colors.black,
      margin:5,
      borderRadius:10,
    }
  };
  const sceneContainerStyle = {
    backgroundColor: colors.primary,
  };
  

const TabNavigator = () => {

    return (
            <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
                <Tab.Screen name="Shop " component={ShopStack}
                 options={{
                    tabBarIcon: () => (<Image source={require("./../../assets/shop.png")} style={{marginBottom: 10, width: 30, height: 30, display:'flex'}} />)
                }}
                 />
                <Tab.Screen name="Cart " component={CartStack} 
                 options={{
                    tabBarIcon: () => (<Image source={require("./../../assets/cart.png")} style={{marginBottom: 10, width: 30, height: 30, display:'flex'}} />)
                }}
                />
                <Tab.Screen name="Orders " component={OrderStack} 
                 options={{
                    tabBarIcon: () => (<Image source={require("./../../assets/order.png")} style={{marginBottom: 10, width: 30, height: 30, display:'flex'}} />)
                }}
                />
            </Tab.Navigator>
    );
}

export default TabNavigator

