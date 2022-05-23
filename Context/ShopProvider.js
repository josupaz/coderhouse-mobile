import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/config";
import {Platform, InteractionManager} from 'react-native';

export const Shop = createContext();

const ShopProvider = ({children}) => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [cart, setCart] = useState([])
    const [usuario, setUsuario] = useState([])

    const _setTimeout = global.setTimeout;
    const _clearTimeout = global.clearTimeout;
    const MAX_TIMER_DURATION_MS = 60 * 1000;
    if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
        const timerFix = {};
        const runTask = (id, fn, ttl, args) => {
            const waitingTime = ttl - Date.now();
            if (waitingTime <= 1) {
                InteractionManager.runAfterInteractions(() => {
                    if (!timerFix[id]) {
                        return;
                    }
                    delete timerFix[id];
                    fn(...args);
                });
                return;
            }
    
            const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
            timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
        };
    
        global.setTimeout = (fn, time, ...args) => {
            if (MAX_TIMER_DURATION_MS < time) {
                const ttl = Date.now() + time;
                const id = '_lt_' + Object.keys(timerFix).length;
                runTask(id, fn, ttl, args);
                return id;
            }
            return _setTimeout(fn, time, ...args);
        };
    
        global.clearTimeout = id => {
            if (typeof id === 'string' && id.startsWith('_lt_')) {
                _clearTimeout(timerFix[id]);
                delete timerFix[id];
                return;
            }
            _clearTimeout(id);
        };
    }

    useEffect(()=> {

        (async ()=>{
            const queryCollection = query(collection(db, "personajes"))
            const queryCollectionCategories = query(collection(db, "categories"))
            const querySnapshot = await getDocs(queryCollection);
            const querySnapshotCategories = await getDocs(queryCollectionCategories)
            const productos = []
            querySnapshot.forEach((doc)=> {
                const producto = {id: doc.id, ...doc.data()}
                productos.push(producto)
            })

            const categories = []
            querySnapshotCategories.forEach((doc)=> {
                const category = {id: doc.id, ...doc.data()}
                categories.push(category)
            })

            setProducts([...productos])
            setCategories([...categories])
            
        })()

    }, [])

    const addCart = (product, quantityToAdd) => {

        const producto = isInCart(product);
        if (producto) {
            producto.quantity += quantityToAdd;
            const cartFiltrado = cart.filter(elemento => elemento.id !== producto.id);
            cartFiltrado.push(producto);
            setCart(cartFiltrado);
            //Deberíamos agregar la cantidad al producto existente
        } else {
            //Agregamos un nuevo objeto al carrito
            setCart([...cart, { ...product, quantity: quantityToAdd }]);
        }
    }

    //Función auxiliar que me determina si el producto está o no en el cart
    const isInCart = (producto) => {
        return cart.find(elemento => elemento.id === producto.id);
    }

    const sumaTotal = () => {
        const suma = cart.reduce((acc, item) => acc += (item.price * item.quantity), 0)
        return suma;
    }

    const conteoItems = () => {
        const suma = cart.reduce((acc, item) => acc += (item.quantity), 0)
        return suma;
    }

    const usuarioOnline=(user)=>{
        setUsuario(user)
      
      }

    const removeItem = (id) => {
        const auxCart = cart.filter(item => item.id !== id);
        setCart(auxCart);
    }

    const clearCarrito = () => {

        setCart ([]);
    }

    return(
        <Shop.Provider value={{products, categories, addCart, cart, sumaTotal, conteoItems, usuario, usuarioOnline, removeItem, clearCarrito}}>
            {children}
        </Shop.Provider>
    )
}

export default ShopProvider;