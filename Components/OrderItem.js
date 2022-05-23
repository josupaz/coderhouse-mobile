import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "../Styles/colors";
import ProductList from "./ProductList";

const OrderItem = ({ item }) => {
  const fnRender = ({ item }) => {
    return <ProductList item={item} />;
  };

  return (
    <View Style={styles.card}>
      <Text style={styles.bold}>Orden: {item.id}</Text>
      <Text>Fecha:{item.createdAt}</Text>
      <Text>Comprador: {item.buyer.nombre}</Text>
      <Text>Direccion de entrega:{item.buyer.direccion}</Text>

      <FlatList
        data={item.items}
        keyExtractor={(item) => item.id}
        renderItem={fnRender}
      ></FlatList>
      <Text style={styles.bold}>Total:{item.total}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ligthgreen,
    borderRadius: 15,
    textAlign: "center",
    borderRadius: 5,
    borderColor: colors.black,
  },
  bold: {
    fontWeight: "bold",
    margin: 20,
  },
});
