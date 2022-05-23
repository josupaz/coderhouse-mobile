import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import { colors } from "../Styles/colors";

const Checkout = ({ handleModal, value, total }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [checkoutText, setCheckoutText] = useState("");
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handlePurchase = () => {
    // console.log("Se realizo la compra");
    // console.log(nombre, direccion);
    if (nombre === "" || direccion === "") {
      return;
    }
    const orderGenerada = {
      buyer: {
        nombre: nombre,
        direccion: direccion,
      },
      usuario: value.usuario,
      items: value.cart,
      total: total,
      createdAt: new Date().toLocaleString(),
    };

    //Primer paso: abrir un batch
    const batch = writeBatch(db); //ver en qué level colocarlo

    //Array auxiliar que me define si hay productos fuera de stock
    const outOfStock = [];

    //Chequear el stock del producto en  db y resta a la cantidad, si corresponde
    value.cart.forEach((prod) => {
      setLoadingCheckout(true);
      getDoc(doc(db, "personajes", prod.id)).then((documentSnapshot) => {
        if (documentSnapshot.data().stock >= prod.quantity) {
          batch.update(doc(db, "personajes", documentSnapshot.id), {
            stock: documentSnapshot.data().stock - prod.quantity,
          });
        } else {
          outOfStock.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }

        //si no hay productos fuera de stock guardo la orden en db
        if (outOfStock.length === 0) {
          addDoc(collection(db, "orders"), orderGenerada)
            .then(({ id }) => {
              batch.commit().then(() => {
                setCheckoutText(`Se genero la order con id:  + ${id}`);
              });
            })
            .catch((err) => {
              console.log(`Error: ${err.message}`);
              setCheckoutText(`Error: ${err.message}`);
            });
            setTimeout(() => {
              value.clearCarrito();
            }, 5000);
           
        } else {
          let mensaje = "";
          for (const producto of outOfStock) {
            mensaje += `${producto.name} `;
          }
          setCheckoutText(`Productos fuera de stock: ${mensaje}. Cargue los productos que desee en el carrito, considerando los faltantes.`);
          setTimeout(() => {
            value.clearCarrito();
          }, 5000);
        }

        setLoadingCheckout(false);
      });
    });
  };

  return (
    <View style={styles.modalParent}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleModal}>
          <Text style={styles.close}>X</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Ingresar nombre"
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          placeholder="Ingresar direccion"
          onChangeText={setDireccion}
          value={direccion}
        />
        <Text>¿Quieres confirmar la compra?</Text>
        <TouchableOpacity onPress={handleModal}>
          <Text>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePurchase}>
          <Text>Confirmar</Text>
        </TouchableOpacity>
        {loadingCheckout && (
          <ActivityIndicator size={"small"} color={"green"} />
        )}
        {!loadingCheckout && <Text>{checkoutText}</Text>}
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  modalParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    position: "relative",
    top: -250,
    height: 200,
    width: 300,
    backgroundColor: colors.lightViolet,
  },
  close: {
    left:280,
  },
});
