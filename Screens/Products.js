import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Shop } from "../Context/ShopProvider";
import { colors } from "../Styles/colors";

const Products = ({ navigation, route }) => {
  const { category } = route.params;

  const { products } = useContext(Shop);

  const [productFilter, setProductFilter] = useState([]);

  useEffect(() => {
    (async () => {
      const productFilter = products.filter(
        (product) => product.species === category
      );
      setProductFilter(productFilter);
    })();
  }, [category]);

  const handleDetail = (item) => {
    navigation.navigate("Detail", {
      id: item.id,
      title: item.name,
      item: item,
    });
  };

  return (
    <View style={styles.viewstyle}>
      {products.length !== 0 ? (
        <FlatList
          data={productFilter}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleDetail(item)}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator size={"large"} color={"blue"} />
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection:'row',
  },
  text : {
    textAlign:'center',
    padding: 12,
    marginTop: 30,
    borderWidth: 4,
    borderColor: colors.black,
    borderRadius: 6,
    borderRadius: 8,

  },

  
});
