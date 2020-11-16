import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import api from '../../services/api';
import { useNavigation, useRoute, } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import Constants from 'expo-constants';

export default function ListaPrestadores() {
    const [listNames, setListName] = useState([]);
    const [listNotas, setListNotas] = useState([]);
    const [listEmails, setListEmails] = useState([]);
    const [listWhatsapp, setListWhatsapp] = useState([]);
    const [listPrestadorIds, setListPrestadorIds] = useState([]);

    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    function renderList(response, index) {
        return (
            <TouchableOpacity key={index} onPress={() => renderPrestador(index)}>
                <List.Item
                    style={styles.listItem}
                    title={<Text style={styles.listText}>{listNames[index]}</Text>}
                    left={() => <Icon style={styles.listIcon} name="user" color="#eee" />}
                    right={() =>
                        <Text style={styles.listText}>
                            <Icon style={styles.listIconStar} name="star" color="#FFC107" />
                            <Text style={styles.textIconStar}>{listNotas[index]}</Text>
                        </Text>}
                />
            </TouchableOpacity>
        )
    }

    async function renderPrestador(index) {
        navigation.navigate('PrestadorDetails',{
            name: listNames[index],
            nota: listNotas[index],
            email: listEmails[index],
            whatsapp: listWhatsapp[index],
            listPrestadorIds: listPrestadorIds[index]
        })
    }

    useEffect(() => {
        async function getPrestadores() {
            const prestadores = await api.post('listar-prestador-especialidade', {
                especialidade_id: routeParams.especialidade_id,
                tipo_de_servico_id: routeParams.tipo_de_servico_id
            })
            let listNames = [];
            let listNotas = [];
            let listEmails = [];
            let listWhatsapp = [];
            let listPrestadorIds = [];

            prestadores.data.map(response => {
                listNotas.push(response.Prestador.nota_pessoal);
                listNames.push(response.Prestador.Usuario.nome);
                listEmails.push(response.Prestador.Usuario.email);
                listWhatsapp.push(response.Prestador.Usuario.whatsapp);
                listPrestadorIds.push(response.Prestador.id);
            })
            setListName(listNames);
            setListNotas(listNotas);
            setListEmails(listEmails);
            setListWhatsapp(listWhatsapp);
            setListPrestadorIds(listPrestadorIds);
        }
        getPrestadores();
    }, [])

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView >
                <List.Section style={styles.section}>
                    <List.Subheader style={styles.listSubHeader}>Lista de prestadores</List.Subheader>
                    {listNames.map((response, index) => renderList(response, index))}
                </List.Section>
            </ScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#393355",
        paddingTop: (Constants.statusBarHeight + 15),
    },
    listSubHeader: {
        fontSize: 25,
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        position: 'absolute',
        alignSelf: 'center',
    },
    listItem: {
        width: "95%",
        alignSelf: 'center',
        height: 52,
        backgroundColor: "#393375",
        marginVertical: 11,
        borderRadius: 50,
    },
    listText: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 18,
        marginEnd: 6,
        paddingTop: 2
    },
    listIcon: {
        fontSize: 32,
        paddingTop: 1,
        paddingStart: 5
    },
    listIconStar: {
        fontSize: 30,
    },
    textIconStar: {
        fontSize: 21,
        paddingHorizontal: 22
    },
    section: {
        paddingTop: 75
    },
})