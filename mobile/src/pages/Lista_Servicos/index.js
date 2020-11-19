import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import Constants from 'expo-constants';

export default function ListaPrestadores() {
    const [listNames, setListName] = useState([]);
    const [listCategoria, setListCategoria] = useState([]);
    const [listDatas, setListDatas] = useState([]);
    const [listHora, setListHora] = useState([]);
    const [listStatus, setListStatus] = useState([]);
    const [listIdsServicos, setListIdsServicos] = useState([]);

    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    function renderList(response, index) {
        return (
            <TouchableOpacity key={response}>
                <List.Item
                    style={styles.listItem}
                    title={<Text style={styles.listText}>{listNames[index]}</Text>}
                    left={() => <Icon style={styles.listIcon} name="user" color="#eee" />}
                    right={() =>
                        <Text style={styles.listText}>
                            <Icon style={styles.listIconStar} name="star" color="#FFC107" />
                            <Text style={styles.textIconStar}>{listHora[index]}</Text>
                        </Text>}
                />
            </TouchableOpacity>
        )
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    useEffect(() => {
        async function listarServicos() {
            let servicos;
            if (routeParams.classificacao === 'Usuario') {
                servicos = await api.post('listar-servicos', {
                    classificacao: routeParams.classificacao,
                    usuario_id: routeParams.id
                })
            } else {
                servicos = await api.post('listar-servicos', {
                    classificacao: routeParams.classificacao,
                    prestador_id: routeParams.id
                })
            }
            let listNames = [];
            let listCategoria = [];
            let listDatas = [];
            let listHora = [];
            let listStatus = [];
            let listIdsServicos = []
            servicos.data.map(response => {
                listNames.push(response.usuarioId.nome);
                listCategoria.push(response.especialidadeId.nome);
                listStatus.push(response.status);
                listIdsServicos.push(response.id);
                //Pegando data e hora e padronizando
                let data = new Date(response.date);
                let hour = addZero(data.getHours());
                let minutos = addZero(data.getMinutes());
                let day = data.getDate()
                let month = data.getUTCMonth() + 1;
                let year = data.getFullYear();
                let horaAtual = `${hour}h:${minutos}min`
                let dataAtual = `${year}-${month}-${day}`
                listDatas.push(dataAtual);
                listHora.push(horaAtual);
            })
            setListName(listNames);
            setListCategoria(listCategoria);
            setListDatas(listDatas);
            setListHora(listHora);
            setListStatus(listStatus);
            setListIdsServicos(listIdsServicos);
        }
        listarServicos();
    }, [])

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView >
                <List.Section style={styles.section}>
                    <List.Subheader style={styles.listSubHeader}>Lista de prestadores</List.Subheader>
                    {listIdsServicos.map((response, index) => renderList(response, index))}
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