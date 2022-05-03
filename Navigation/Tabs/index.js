import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from '../Stacks/Shop';
import CartStack from '../Stacks/Cart';
import OrderStack from '../Stacks/Orders';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
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
        </NavigationContainer>
    );
}

export default TabNavigator

