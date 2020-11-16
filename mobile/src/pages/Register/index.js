import React, { useState } from 'react'
import { Text, KeyboardAvoidingView, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('');
    const [checked, setChecked] = useState(false);
    const [classificacao, setClassificacao] = useState('Usuario');
    const navigation = useNavigation();

    async function handleSignUp() {
        const { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
            showMessage({
                message: 'Necessário permissão para obter localização',
                type: "warning",
            });
        }

        const location = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = location.coords;
        if (classificacao === "Usuario") {
            const response = await api.post('criar-usuario', {
                nome: name,
                email: email,
                senha: password,
                whatsapp: whatsapp,
                latitude: latitude,
                longitude: longitude,
                classificacao: classificacao
            })
            showMessage({
                message: response.data.message,
                type: "success",
            });
            navigation.navigate('Login')
        } else {
            const response = await api.post('criar-usuario', {
                nome: name,
                email: email,
                senha: password,
                whatsapp: whatsapp,
                latitude: latitude,
                longitude: longitude,
                classificacao: classificacao,
            })
            navigation.navigate('TipoServico', {
                idPrestador: response.data.id,
                messageTypeService: "você irá prestar",
                messageTypeEspecialty: "uma ou mais especialidades",
                logged: false
            })
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#393355" }} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
            <View style={styles.main}>
                <Text style={styles.title}>REGISTRO</Text>
                <TextInput style={styles.input} placeholder="Nome.." value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Email.." value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Senha.." value={password} onChangeText={setPassword} secureTextEntry={true} />
                <TextInput style={styles.input} placeholder="Whatsapp.." value={whatsapp} onChangeText={setWhatsapp} />
                <View>
                    <Checkbox.Item
                        label="Prestador"
                        labelStyle={styles.checkboxLabel}
                        style={styles.checkbox}
                        uncheckedColor="#eec"
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                            (checked) ? setClassificacao('Usuario') : setClassificacao('Prestador');
                        }} />
                </View>
                <TouchableOpacity onPress={handleSignUp} style={styles.link}>
                    <Text style={styles.linkText}>Criar conta</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
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
    title: {
        color: "#fff",
        fontSize: 25,
        alignSelf: "center",
        marginBottom: 95,
        fontFamily: "Roboto_900Black_Italic"
    },
    link: {
        marginTop: 14,
        alignSelf: 'flex-end'
    },
    linkText: {
        color: '#eed',
        fontSize: 15,
        fontFamily: "Roboto_900Black_Italic",
        marginTop: 60,
    },
    checkbox: {
        backgroundColor: "#393375",
        borderRadius: 5,

    },
    checkboxLabel: {
        color: "#eed",
        fontFamily: "Roboto_500Medium_Italic"
    }
})