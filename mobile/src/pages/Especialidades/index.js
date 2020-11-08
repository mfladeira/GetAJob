import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome as Icon, } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { Checkbox } from 'react-native-paper';

export default function TipoServico() {
    const [especialidades, setEspecialidades] = useState([])
    const [especialidade1Checked, setEspecialidade1Checked] = useState(false)
    const [especialidade2Checked, setEspecialidade2Checked] = useState(false)
    const [especialidade3Checked, setEspecialidade3Checked] = useState(false)
    const [especialidade4Checked, setEspecialidade4Checked] = useState(false)

    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        async function getEspecialidades() {
            const especialidades = await api.post('listar-especialidade', {
                tipo_de_servico_id: routeParams.idEspecialidade
            })
            const arrayEspecialidades = []
            especialidades.data.map(response => {
                arrayEspecialidades.push(response.nome);
            })
            setEspecialidades(arrayEspecialidades);
        }
        getEspecialidades()
    }, [])

    function handleSignUp() {

    }
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#393355" }} >
            <View style={styles.main}>
                <Text style={styles.title}>Selecione uma ou mais especialidades abaixo</Text>
            </View>
            <View style={styles.containerItens}>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="gear" size={30} color="#eee" />{"  "}<Text>{especialidades[0]}</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={especialidade1Checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setEspecialidade1Checked(!especialidade1Checked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="gear" size={30} color="#eee" />{"  "}<Text>{especialidades[1]}</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={especialidade2Checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setEspecialidade2Checked(!especialidade2Checked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="gear" size={30} color="#eee" />{"  "}<Text>{especialidades[2]}</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={especialidade3Checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setEspecialidade3Checked(!especialidade3Checked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="gear" size={30} color="#eee" />{"  "}<Text>{especialidades[3]}</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={especialidade4Checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setEspecialidade4Checked(!especialidade4Checked);
                        }} />
                </View>
                <TouchableOpacity onPress={handleSignUp} style={styles.link}>
                    <Text style={styles.linkText}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        paddingStart: 45
    },
    title: {
        color: "#fff",
        fontSize: 25,
        marginBottom: 65,
        fontFamily: "Roboto_900Black_Italic"
    },
    itemText: {
        fontSize: 23,
        color: "#ddd",
        fontFamily: "Roboto_900Black_Italic",
    },
    itemContainer: {
        width: "85%",
        alignSelf: "center",
        height: 52,
        justifyContent: 'center',
        backgroundColor: "#393375",
        marginVertical: 10,
        borderRadius: 5,
    },
    containerItens: {
        paddingBottom: 70
    },
    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    link: {
        alignSelf: 'flex-end',
        marginEnd: 36,
    },
    linkText: {
        color: '#eed',
        fontSize: 16,
        fontFamily: "Roboto_900Black_Italic",
        paddingTop:25
    },
})