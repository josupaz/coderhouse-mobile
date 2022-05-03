import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Categories from "../Screens/Categories";
import Detail from "../Screens/Detail";
import Products from "../Screens/Products";

const MainNavigator = () => {

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Categories"
                //por que no funcionan los estilos del header? :(
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#4C0075',
                  },
                  headerTintColor: '#FFFFFF',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
            >
                <Stack.Screen
                    name="Categories"
                    component={Categories}
                    options={{ title: "Categories"
                     }}
                />
                <Stack.Screen
                    name="Products"
                    component={Products}
                    options={({ route }) => ({ title: route.params.category,
                        })} />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={({ route }) => ({ title: route.params.title,
                    })} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator