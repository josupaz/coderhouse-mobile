import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from "../Styles/colors";

const CartItem = ({item, handleRemove}) => {
  return (
    <View style={styles.view}>
      <Text>{item.name}, Cant: {item.quantity}, total: ${item.price * item.quantity}</Text>
      <TouchableOpacity onPress={()=> handleRemove(item.id)}>
          <Text style={styles.btn}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
  view: {
    flex: 1,
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
    padding: 10,
    marginTop: 50,
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