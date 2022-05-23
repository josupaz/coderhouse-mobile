import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { auth } from "../Firebase/config";
import Auth from "../Screens/Auth";
import TabNavigator from "./Tabs";
import { Shop } from "../Context/ShopProvider";


const MainNavigator = () => {

    const [user, setUser] = useState(null);
    const {usuarioOnline} = useContext(Shop);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                usuarioOnline(user.email);
                // ...
            } else {
                setUser(null)
                // User is signed out
                // ...
            }
        });
    }, [])

    const Stack = createNativeStackNavigator();


    return (
        <NavigationContainer>
            {user ?
                <TabNavigator></TabNavigator>
                :
                <Auth />
            }
        </NavigationContainer>
    )
}

export default MainNavigator