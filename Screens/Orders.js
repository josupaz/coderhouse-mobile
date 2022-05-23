import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Shop } from "../Context/ShopProvider";
import OrderItem from "../Components/OrderItem";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../Firebase/config";
import { colors } from "../Styles/colors";

const Orders = () => {
  const { usuario } = useContext(Shop);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const queryCollectionOrders = query(
        collection(db, "orders"),
        where("usuario", "==", usuario)
      );

      const querySnapshotOrders = await getDocs(queryCollectionOrders);

      const ordenes = [];
      querySnapshotOrders.forEach((doc) => {
        const orden = { id: doc.id, ...doc.data() };
        ordenes.push(orden);
      });
      setOrders([...ordenes]);
    })();
  }, [orders]);

  const fnRender = ({ item }) => {
    return <OrderItem item={item} />;
  };

  return (
    <View style={styles.container}>
      {orders.length !== 0 ? (
        <FlatList
          data={orders}
          renderItem={fnRender}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.view}>
          <Image
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              borderRadius: 15,
            }}
            source={require("../assets/empty.gif")}
          />
          <Text>No existen ordenes ! ! !</Text>
        </View>
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
