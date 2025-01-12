import { Switch, View, Button, TextInput, Alert, Image } from "react-native";
import React, { useState } from "react";
import styled from 'styled-components/native';
import { useRouter } from "expo-router";
import { getMusicData } from "./api-client";

// Flex : tomar todo el espacio disponible
// flexDirection: {row | dolumn} los elementos se alinean en filas o columnas segun parametro

// Requisitos: pantalla de login con:
// Text input (nombre, email, contraseña)
// Etiquetas
// Imagen
// Botón

// Botón: imprimir alert con validaciones (validar que el email un email, y contraseña validacion al menos que sea de 8 characteres)

const MainContainer = styled(View)`
    flex: 1;
    flex-d2irection: column;
    justify-content: space-around;
    align-items: center;
    background-color: #F5FCFF;
`

const Box = styled(View)`
    width: 250px;
    height: 50px;
    margin: 10px;
    background-color: black;
`

const ImgView = styled(Box)`
    flex: 1;
    height: 150px;
    background-color: red;
    align-items: center;
    justify-content: center;
`

const TextView = styled(Box)`
    flex: 1;
    background-color: none;
    align-items: center;
    justify-content: center;
`

const TxtIn = styled(TextInput)`
    width: 200px;
    height: 30px;
    margin: 10px;
    background-color: yellow;
`

const PassIn = styled(TxtIn)`
    width: 155px;
`

const BtnView = styled(Box)`
    flex: 1;
    background-color: none;
    align-items: center;
    justify-content: center;
`

const PassView = styled(View)`
    flex-direction: row;
`

const Img = styled(Image)`
    flex: 1;
    aspect-ratio: 1;
    resize-mode: contain;
`
const Btn = styled(Button)`
    background-color: blue;
`

const isPasswordValid = (password: string, ConfirmPassword: string) => {
    // Password must be at least 8 characters
    // Password must contain at least one uppercase letter
    // Password must contain at least one special character
    // Password has to be equal to ConfirmPassword

    const upperCase = /[A-Z]/;
    const specialChar = /[!@#$%^&*\?\¿\¡\(\)\{\}\[\]\+\-\_]/;

    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (!password.match(upperCase)) return 'La contraseña debe tener al menos una letra mayúscula';
    if (!password.match(specialChar)) return 'La contraseña debe tener al menos un caracter especial';
    if (password !== ConfirmPassword) return "Las contraseñas deben ser iguales!";
    return "VALID";
}

export default function Index() {
    
    const router = useRouter()
    const onPressLearnMore = () => {
        router.push({
            pathname: "/register",
        });
    }

    const onPressLearnMore2 = () => {
        router.push({
            pathname: "/home",
        });
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validations = (email: string, password: string, ConfirmPassword: string, username: string) => {
        if (password === '' || email === '' || ConfirmPassword === "" || username === "") {
            Alert.alert('Hay campos vacíos. Todos los campos son obligatorios');
        } else if (email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            console.log(password);
            console.log(ConfirmPassword);
            const passwordValidation = isPasswordValid(password, ConfirmPassword);
            if (passwordValidation === 'VALID') {
                Alert.alert('VALIDACIÓN EXITOSA');
                router.push({
                    pathname: "/register",
                });
            } else {
                Alert.alert(passwordValidation);
            }
        } else {
            Alert.alert('El email debe tener un formato válido');
        }
    };

    return (
        <MainContainer>
            <ImgView>
                <Img source={{uri: 'https://reactnative.dev/docs/assets/p_cat2.png'}} style={{width: 150, height: 150}} />
            </ImgView>
            <TextView>
                <TxtIn placeholder="Nombre de usuario" value={username} onChangeText={setUsername} />
                <TxtIn placeholder="Email" value={email} onChangeText={setEmail} />
                <PassView>
                    <PassIn placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                    <Switch value={showPassword} onValueChange={setShowPassword} />
                </PassView>

                 <PassView>
                    <PassIn placeholder="Repetir Contraseña" value={ConfirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />
                 </PassView>
            </TextView>
            <BtnView>
                <Btn title="Iniciar Sesión" onPress={(onPressLearnMore) => validations(email, password, ConfirmPassword, username)} />
            </BtnView>
            <BtnView>
                <Btn title="Home" onPress={(onPressLearnMore2)} />
            </BtnView>
        </MainContainer>
    )
}