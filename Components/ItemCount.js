import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


const ItemCount = ({ handleAdd, setQuantity, quantity, stock }) => {

  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.viewtwo}>
        <TouchableOpacity onPress={handleDecrement}>
          <Text style={styles.text}> - </Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>

        <TouchableOpacity onPress={handleIncrement}>
          <Text style={styles.text}> + </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleAdd} >
        <Text style={styles.text}> Agregar al carrito </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCount;


const styles = StyleSheet.create({
  text: {
    fontSize:24
  },
  view: {
    position: "relative",
    top: 400,
    left: -100,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  viewtwo: {
    flexDirection: "row",
  }
  })