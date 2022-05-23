import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Shop } from "../Context/ShopProvider";
import Checkout from "../Components/Checkout";
import CartItem from "../Components/CartItem";
import { colors } from "../Styles/colors";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  


  const value = useContext(Shop);

  const fnRender = ({ item }) => {
    return <CartItem item={item} handleRemove={value.removeItem} />;
  };
  
  useEffect(() => {
    setTotal(value.sumaTotal());
  }, [value.cart]);


  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <View style={styles.view}>
      {value.cart.length !== 0 ? (
        <>
          <FlatList
            data={value.cart}
            keyExtractor={(item) => item.id}
            renderItem={fnRender}
          ></FlatList>
          <View>
            <Text>Total: {total.toFixed(1)}</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.btn}>Purchase</Text>
            </TouchableOpacity>
          </View>
          {showModal ? (
            <Checkout handleModal={handleModal} value={value} total={total} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <View style={styles.viewTwo}>
        <Image
      style={{ width: 100, height: 100, marginBottom: 15, borderRadius:15 }}
      source={require("../assets/empty.gif")}
    />
        <Text>No hay productos en el cart</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  }, 
  viewTwo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
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
    padding: 3,
    marginTop: 10,
  }, 
});
