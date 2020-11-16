import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome as Icon, } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'

export default function TipoServico() {
    const [namesOfTypes, setNamesOfTypes] = useState([])
    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        async function getTypesService() {
            const typesService = await api.get('listar-tipos-de-servico')
            const arrayTypes = []
            typesService.data.map(response => {
                arrayTypes.push(response.nome);
            })
            setNamesOfTypes(arrayTypes);
        }
        getTypesService()
    }, [])

    function handleTypeService(idTypeService) {
        navigation.navigate('Especialidades', {
            idPrestador: routeParams.idPrestador,
            idTypeService,
            messageTypeEspecialty: routeParams.messageTypeEspecialty,
            logged: routeParams.logged
        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#393355" }} >
            <View style={styles.main}>
                <Text style={styles.title}>Selecione o tipo de serviço que {routeParams.messageTypeService}</Text>
            </View>
            <View style={styles.containerItens}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => handleTypeService(1)}>
                    <View style={styles.containerItem}>
                        <Icon name="home" size={30} color="#eee" />
                        <Text style={styles.itemText}>{namesOfTypes[0]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemContainer} onPress={() => handleTypeService(2)}>
                    <View style={styles.containerItem}>
                        <Ionicons name="md-hammer" size={30} color="#eee" />
                        <Text style={styles.itemText}>{namesOfTypes[1]}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemContainer} onPress={() => handleTypeService(3)}>
                    <View style={styles.containerItem}>
                        <Icon name="laptop" size={30} color="#eee" />
                        <Text style={styles.itemText}>{namesOfTypes[2]}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemContainer} onPress={() => handleTypeService(4)}>
                    <View style={styles.containerItem}>
                        <Icon name="handshake-o" size={30} color="#eee" />
                        <Text style={styles.itemText}>{namesOfTypes[3]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        padding: 24,
    },
    title: {
        color: "#fff",
        fontSize: 25,
        alignSelf: "center",
        marginBottom: 65,
        fontFamily: "Roboto_900Black_Italic",
        textAlign:'center'
    },
    itemText: {
        fontSize: 23,
        color: "#ddd",
        fontFamily: "Roboto_900Black_Italic",
        marginHorizontal: 12
    },
    itemContainer: {
        borderRadius: 70,
        width: "95%",
        alignSelf: "center",
        height: 52,
        justifyContent: 'center',
        backgroundColor: "#393375",
        marginVertical: 10
    },
    containerItens: {
        paddingBottom: 110
    },
    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})