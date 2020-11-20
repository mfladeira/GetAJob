import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import { useNavigation } from '@react-navigation/native'
import { showMessage } from "react-native-flash-message";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function handleSubmit() {
        api.post('login', {
            email,
            senha: password
        }).then(response => {
            if (response.data.error) {
                showMessage({
                    message: response.data.error,
                    type: "warning",
                });
            } else {
                navigation.navigate('Home', {
                    email: email,
                    nome: response.data.nome,
                    userId: response.data.id,
                    classificacao: response.data.classificacao,
                })
                setEmail('')
                setPassword('')
            }
        })
    }

    function handleSignUp() {
        navigation.navigate('Register')
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column' }} >
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
            >
                <View style={styles.main}>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Digite seu email.."
                        />
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Digite sua senha.."
                        />
                    </View>
                    <RectButton style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                    <TouchableOpacity onPress={handleSignUp} style={styles.link}>
                        <Text style={styles.linkText} textDe>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        resizeMode: 'cover',
        height: 690,
        justifyContent: 'center',
    },
    form: {
        marginTop: 110
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        height: 50,
        color: '#fff',
        fontSize: 15,
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 0.4,
        paddingLeft: 12,
        fontFamily: "Roboto_900Black_Italic"
    },
    button: {
        height: 46,
        borderRadius: 4,
        backgroundColor: '#rgb(50, 50, 125)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#eed',
        fontSize: 15,
        fontFamily: "Roboto_900Black_Italic"
    },
    link: {
        marginTop: 8,
    },
    linkText: {
        color: '#eed',
        fontSize: 15,
        textDecorationLine: 'underline',
        fontFamily: "Roboto_900Black_Italic"
    },
})