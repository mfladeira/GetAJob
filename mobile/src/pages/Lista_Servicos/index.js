import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { List, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native'
import Constants from 'expo-constants';
import { showMessage } from "react-native-flash-message";

export default function ListaPrestadores() {
    const [listNames, setListName] = useState([]);
    const [listCategoria, setListCategoria] = useState([]);
    const [listDatas, setListDatas] = useState([]);
    const [listHora, setListHora] = useState([]);
    const [listStatus, setListStatus] = useState([]);
    const [listIdsServicos, setListIdsServicos] = useState([]);
    const [listIdsPrestador, setListIdsPrestador] = useState([]);
    const [listNamesPrestadores, setListNamesPrestadores] = useState([]);

    let [resetScreen, setResetScreen] = useState('');
    let [idService, setIdService] = useState(0);
    let [idPrestador, setIdPrestador] = useState(0);
    let [nota, setNota] = useState('')
    const [visible, setVisible] = React.useState(false);

    const showDialog = (id, idPrestador) => {
        setIdService(id);
        setIdPrestador(idPrestador);
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false)
        setNota('')
    };


    const route = useRoute();
    const routeParams = route.params;

    async function aceitarServico(id) {
        await api.post('update-servico', {
            status: "ativo",
            id: id
        })
        setResetScreen(resetScreen + 1);
    }

    async function recusarServico(id) {
        await api.delete('delete-servico', {
            data: { id: id }
        })
        setResetScreen(resetScreen + 1);
    }

    async function avaliarServico() {
        await api.post('update-servico', {
            status: "finalizado",
            id: idService
        })
        const response = await api.post('listar-prestador', {
            id: idPrestador
        })
        let notaNova = ((Number(response.data.nota_pessoal) + Number(nota)) / 2);
        await api.put('put-prestador', {
            notaPessoal: notaNova,
            id: Number(idPrestador)
        })
        hideDialog()
        setResetScreen(resetScreen + 1);
        showMessage({
            message: 'Serviço avaliado com sucesso',
            type: "success",
        });
    }

    function renderList(response, index) {
        return (
            <View key={response}>
                <List.Item
                    style={styles.listItem}
                    left={() =>
                        <Text style={styles.listText}>
                            Prestador: {listNamesPrestadores[index]}{"\n"}
                            Cliente: {listNames[index]}{"\n"}
                            Categoria: {listCategoria[index]}{"\n"}
                            Dia: {listDatas[index]}{"\n"}
                            Hora:{listHora[index]}{"\n"}
                            Status: {listStatus[index]}
                        </Text>}
                    right={() => {
                        if ((listStatus[index] == 'pendente') && (routeParams.classificacao == 'Prestador')) {
                            return (
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.actionWhatsapp} onPress={() => aceitarServico(response)}>
                                        <View >
                                            <Text style={styles.actionText}>Aceitar</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionEmail} onPress={() => recusarServico(response)}>
                                        <View >
                                            <Text style={styles.actionText}>Recusar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        } else if ((listStatus[index] == 'ativo') && (routeParams.classificacao == 'Usuario')) {
                            return (
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.actionEmail} onPress={() => showDialog(response, listIdsPrestador[index])}>
                                        <View style={styles.buttonService}>
                                            <Text style={styles.actionText}>Avaliar</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                            )
                        }

                    }}
                />
            </View>
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
                    usuario_id: routeParams.id,
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
            let listIdsPrestador = []
            let listNamesPrestadores = []

            servicos.data.map(response => {
                listNames.push(response.usuarioId.nome);
                listCategoria.push(response.especialidadeId.nome);
                listStatus.push(response.status);
                listIdsServicos.push(response.id);
                listIdsPrestador.push(response.prestador_id)
                listNamesPrestadores.push(response.prestadorId.Usuario.nome)
                //Pegando data e hora e padronizando
                let data = new Date(response.date);
                let hour = addZero(data.getHours());
                let minutos = addZero(data.getMinutes());
                let day = data.getDate()
                let month = data.getUTCMonth() + 1;
                let year = data.getFullYear();
                let horaAtual = `${hour}h:${minutos}min`
                let dataAtual = `${day}-${month}-${year}`
                listDatas.push(dataAtual);
                listHora.push(horaAtual);
            })
            setListName(listNames);
            setListCategoria(listCategoria);
            setListDatas(listDatas);
            setListHora(listHora);
            setListStatus(listStatus);
            setListIdsServicos(listIdsServicos);
            setListIdsPrestador(listIdsPrestador);
            setListNamesPrestadores(listNamesPrestadores);
        }
        listarServicos();
    }, [resetScreen])

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView >
                <List.Section style={styles.section}>
                    <List.Subheader style={styles.listSubHeader}>Serviços</List.Subheader>
                    {listIdsServicos.map((response, index) => renderList(response, index))}
                </List.Section>
            </ScrollView>
            <Provider>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <TextInput
                                style={styles.input}
                                value={nota}
                                onChangeText={setNota}
                                placeholder="Escolha uma nota entre 0 e 5"
                            />
                            <Dialog.Actions>
                                <TouchableOpacity onPress={() => avaliarServico()}><Text>Finalizar</Text></TouchableOpacity>
                            </Dialog.Actions>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </Provider>
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
        height: 125,
        backgroundColor: "#393375",
        marginVertical: 11,
        borderRadius: 5,
    },
    listText: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 15,
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
    actions: {
        position: 'absolute',
        flexDirection: 'row',
        right: 1,
        top: 72
    },
    actionWhatsapp: {
        backgroundColor: '#34af20',
        borderRadius: 8,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    actionEmail: {
        backgroundColor: '#dd4b00',
        borderRadius: 8,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: "Roboto_900Black_Italic",
        paddingHorizontal: 5
    },
    input: {
        textAlign: 'center',
        fontFamily: "Roboto_900Black_Italic",
        fontSize: 16.5,
    }
})