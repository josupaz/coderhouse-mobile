import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Styles/colors';
import { auth } from '../Firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginView, setLoginView] = useState(false);

    const handleSignup = () => {
        if (email !== "" && password != ""){
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                    setEmail("");
                    setPassword("");
                })
               
        }
    }

    const handleLogin = () => {
        if (email !== "" && password != ""){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    setEmail("");
                    setPassword("");
                })
            
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={styles.text}>{loginView ? 'Login' : 'Registro de usuario'}</Text>
                <TextInput style={styles.text}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingrese email"
                ></TextInput>
                <TextInput style={styles.text}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Ingrese password"
                ></TextInput>
                {loginView ?
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.textloginsignup}>Ingresar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.textloginsignup}>Crear</Text>
                    </TouchableOpacity>
                }
                <View>
                    <Text style={styles.text}>{loginView ? 'No tienes usuario?' : 'Ya tienes usuario?'}</Text>
                    <TouchableOpacity
                        onPress={() => setLoginView(!loginView)}>
                        <Text style={styles.text}>
                            {loginView ? 'crear' : 'logeate!'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.terciary,
    },
    subcontainer: {
        backgroundColor: colors.ligthgreen,
        borderWidth: 4,
        borderColor: colors.black,
        borderRadius: 6,
        borderRadius: 8,
        padding: 30,
    },
    text:{
        color: colors.black,
        fontSize: 18,
    },
    textloginsignup:{
        color: colors.white,
        backgroundColor: colors.black,
        fontSize: 18,
        textAlign: "center",
        borderRadius: 6,
        borderRadius: 8,
    },
})