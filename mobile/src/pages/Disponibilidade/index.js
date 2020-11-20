import React, { useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import api from '../../services/api'
import DateTimePicker from '@react-native-community/datetimepicker';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

export default function Disponibilidade() {
    const [segundaChecked, setSegundaCheckedChecked] = useState(false)
    const [tercaChecked, setTercaChecked] = useState(false)
    const [quartaChecked, setQuartaChecked] = useState(false)
    const [quintaChecked, setQuintaChecked] = useState(false)
    const [sextaChecked, setSextaChecked] = useState(false)
    const [sabadoChecked, setSabadoChecked] = useState(false)
    const [domingoChecked, setDomingoChecked] = useState(false)

    const [horarioInicio, setHorarioInicio] = useState("00:00")
    const [horarioFim, setHorarioFim] = useState("00:00")
    const [horarioBoolean, setHorarioBoolean] = useState(false)

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function onChangeDate(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        let hour = addZero(currentDate.getHours());
        let minutos = addZero(currentDate.getMinutes());
        let data = `${hour}:${minutos}`
        if (horarioBoolean === true) {
            setHorarioInicio(data)
        } else {
            setHorarioFim(data)
        }
    }

    function showTimer(horarioBoolean) {
        setShow(true);
        setHorarioBoolean(horarioBoolean)
    };

    async function handleFinishRegister() {
        const response = await api.post('criar-disponibilidade', {
            prestador_id: routeParams.prestador_id,
            segunda: segundaChecked,
            terca: tercaChecked,
            quarta: quartaChecked,
            quinta: quintaChecked,
            sexta: sextaChecked,
            sabado: sabadoChecked,
            domingo: domingoChecked,
            horario_inicio: horarioInicio,
            horario_termino: horarioFim
        })
        showMessage({
            message: 'Cadastrado com sucesso',
            type: "success",
        });
        navigation.navigate('Login')
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#393355" }} >
            <View style={styles.main}>
                <Text style={styles.title}>Informe sua disponibilidade</Text>
            </View>
            <View style={styles.containerItens}>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Segunda-feira</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={segundaChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSegundaCheckedChecked(!segundaChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Terça-feira</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={tercaChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTercaChecked(!tercaChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Quarta-feira</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={quartaChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setQuartaChecked(!quartaChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Quinta-feira</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={quintaChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setQuintaChecked(!quintaChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Sexta-feira</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={sextaChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSextaChecked(!sextaChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Sábado</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={sabadoChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setSabadoChecked(!sabadoChecked);
                        }} />
                </View>
                <View style={styles.itemContainer}>
                    <Checkbox.Item
                        label={<Text style={styles.icon}><Icon name="calendar" size={24} color="#eee" />{"  "}<Text>Domingo</Text></Text>}
                        labelStyle={styles.itemText}
                        uncheckedColor="#eee"
                        status={domingoChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setDomingoChecked(!domingoChecked);
                        }} />
                </View>
                {show && (<DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display='clock'
                    onChange={onChangeDate}
                />)}
                <TouchableOpacity onPress={() => showTimer(true)}>
                    <Text style={styles.linkTimerInicio}><Feather name="clock" size={24} color="#eee" />{"  "}Escolha o horário inicial: {horarioInicio} hrs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showTimer(false)} >
                    <Text style={styles.linkTimer}><Feather name="clock" size={24} color="#eee" />{"  "}Escolha o horário final: {horarioFim} hrs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={handleFinishRegister}>
                    <Text style={styles.linkText}>Finalizar cadastro</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 35,
    },
    title: {
        color: "#fff",
        fontSize: 25,
        fontFamily: "Roboto_900Black_Italic",
        alignSelf: "center",
    },
    itemText: {
        fontSize: 23,
        color: "#ddd",
        fontFamily: "Roboto_900Black_Italic",
    },
    itemContainer: {
        width: "85%",
        alignSelf: "center",
        height: 50,
        justifyContent: 'center',
        backgroundColor: "#393375",
        marginVertical: 8.5,
        borderRadius: 5,
    },
    containerItens: {
        paddingBottom: 10,
    },
    containerItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    link: {
        alignSelf: 'flex-end',
        marginEnd: 30,
    },
    linkText: {
        color: '#eed',
        fontSize: 17,
        fontFamily: "Roboto_900Black_Italic",
        paddingTop: 20
    },
    linkTimer: {
        color: '#eed',
        alignSelf: 'flex-start',
        marginStart: 26,
        fontSize: 17,
        fontFamily: "Roboto_900Black_Italic",
    },
    linkTimerInicio: {
        color: '#eed',
        alignSelf: 'flex-start',
        marginStart: 26,
        fontSize: 17,
        fontFamily: "Roboto_900Black_Italic",
        paddingBottom: 20,
        paddingTop: 10,

    }
})