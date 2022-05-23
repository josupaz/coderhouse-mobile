import { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Shop } from "../Context/ShopProvider";
import { colors } from "../Styles/colors";
import ItemCount from "../Components/ItemCount";

const Detail = ({ route }) => {
  const { item } = route.params;

  const { addCart } = useContext(Shop);
  const [quantity, setQuantity] = useState(1);
  const [showItemCount, setShowItemCount] = useState(true);

  const handleAdd = () => {
    addCart(item, quantity);
    setShowItemCount(false);
  }

  return (
    
      <View style={styles.viewstyle}>
        <View style={styles.viewstyletwo}>
          <Text style={styles.text}>{item.name}</Text>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode="cover"
          />
          <Text style={styles.text}> Price: {item.price}</Text>
        </View>
        <View>
        {showItemCount ? 
                    <ItemCount handleAdd={handleAdd} setQuantity={setQuantity} quantity={quantity} stock={item.stock} />
                    :
                    <>
                        <Text style={styles.textAdd}> Se han agregado {quantity} al carrito! </Text>  
                    </>
                }
          
          </View>    
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  viewstyle: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "row",
  },
  viewstyletwo: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  }, 
   textAdd: {
     paddingTop: 425,
    fontSize: 20,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    paddingLeft: 50,
    marginLeft: 20,
  },
  textbutton: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: colors.darkBlue,
    color: colors.white,
  },
});
