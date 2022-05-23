import { signOut } from "firebase/auth";
import { useContext } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Shop } from "../Context/ShopProvider";
import { auth } from "../Firebase/config";
import { colors } from "../Styles/colors";

const Categories = ({ navigation }) => {
  const { categories, clearCarrito } = useContext(Shop);

  const handleCategory = (categoryID) => {
    //console.log(categoryID);
    navigation.navigate("Products", {
      category: categoryID,
    });
  };

  const handleSignOut = () => {
    clearCarrito();
    signOut(auth).then(() => {
    
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
  }

  return (
    <View style={styles.viewstyle}>
      {categories.length !== 0 ? (
        <FlatList
          data={categories}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleCategory(item.category)}>
                <View style={styles.viewtwostyle}>
                  <Text style={styles.text}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator size={"large"} color={"blue"} />
      )}

      <TouchableOpacity onPress={handleSignOut}>
        <Text style={styles.signout}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "row",
  },
  viewtwostyle: {
    width: 140,
    backgroundColor: "#AEA0AE",
    height: 140,
    marginTop: 15,
    marginLeft: 10,
    shadowColor: "#171717",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 5,
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 15,
  },
  signout:{
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 15,
    shadowRadius: 5,
    borderRadius: 5,
    borderWidth: 4,
    borderColor: colors.white,
    color: colors.white,
    borderRadius: 6,
    borderRadius: 8,
    backgroundColor: colors.black
  },
});
