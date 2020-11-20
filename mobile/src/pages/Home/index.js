import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import api from '../../services/api'

export default function Home() {
    const [notaPessoal, setNotaPessoal] = useState(0)
    const route = useRoute()
    const routeParams = route.params
    const navigation = useNavigation()

    function handleSearchService() {
        navigation.navigate('TipoServico', {
            messageTypeService: "você está procurando",
            messageTypeEspecialty: "a especialidade que você está procurando",
            logged: true,
            userId: routeParams.userId
        })
    }

    function handleServices() {
        navigation.navigate('ListaServico', {
            classificacao: routeParams.classificacao,
            id: routeParams.userId,
        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#393355" }} behavior={Platform.OS === 'ios' ? "padding" : ""}>
            <Text style={styles.textWelcome}>Bem Vindo</Text>
            <Text style={styles.textName}>{routeParams.nome}!!!</Text>
            <View style={styles.main}>
                <TouchableOpacity style={styles.linkServico} onPress={handleServices}>
                    <Text style={styles.linkServicoText}>Serviços</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkSearch} onPress={handleSearchService}>
                    <View style={styles.buttonService}>
                        <Icon size={24} name="search" color="#eee" style={styles.icon} />
                        <Text style={styles.linkSearchText}>Buscar serviço</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
    },
    textWelcome: {
        color: '#fff',
        fontSize: 32,
        alignSelf: 'center',
        position: 'absolute',
        paddingTop: 65,
        fontFamily: "Roboto_900Black_Italic"
    },
    textName: {
        color: '#fff',
        fontSize: 32,
        alignSelf: 'center',
        textAlign: "center",
        position: 'absolute',
        paddingTop: 100,
        fontFamily: "Roboto_900Black_Italic",
    },
    linkSearch: {
        alignSelf: 'center',
        marginStart: '20%',
        backgroundColor: "#393385",
        borderRadius: 70,
        position: "absolute",
    },
    linkSearchText: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 23,
        height: 75,
        width: 165,
        paddingTop: 22,
        paddingStart: 8,
    },
    linkServico: {
        alignSelf: 'flex-end',
        backgroundColor: "#393385",
        borderRadius: 70,
        marginStart: 8,
        marginBottom: 15
    },
    linkServicoText: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 17,
        height: 60,
        width: 90,
        paddingTop: 17,
        paddingStart: 12,
    },
    buttonService: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginStart: 20
    }
})