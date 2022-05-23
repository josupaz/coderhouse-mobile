import { View, Text, StyleSheet } from "react-native";

const ProductList = ({ item }) => {
  return (
    <View style={styles.view}>
        <Text>---------Producto:</Text>
      <Text>Categoria: {item.categories}</Text>
      <Text>
        Nombre: {item.name}
      </Text>
      <Text>
        Cant:{item.quantity}
      </Text>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
    view: {
    
  },
});
