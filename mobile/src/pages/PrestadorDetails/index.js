import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import { MaterialIcons as IconMaterial } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api'
import { List } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { showMessage } from "react-native-flash-message";

export default function PrestadorDetails() {
    const [horarioInicio, setHorarioInicio] = useState('')
    const [horarioTermino, setHorarioTermino] = useState('')
    const [diasDaSemanaDisponivel, setDiasDaSemanaDisponivel] = useState([])

    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();

    const message = `Olá ${routeParams.name} estou entrando em contato porque gostaria de contratar os seus serviços!`

    let [mode, setMode] = useState('');
    const [horario, setHorario] = useState("00h:00min")
    const [data, setData] = useState('--/--/--')
    const [show, setShow] = useState(false);

    function onChange(event, selectedDate) {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        if (mode === 'time' && currentDate) {
            let hour = addZero(currentDate.getHours());
            let minutos = addZero(currentDate.getMinutes());
            let horaAtual = `${hour}h:${minutos}min`
            setHorario(horaAtual)
        }
        else if (mode === 'date' && currentDate) {
            let day = currentDate.getDate()
            let month = currentDate.getUTCMonth() + 1;
            let year = currentDate.getFullYear();
            let dataAtual = `${year}-${month}-${day}`
            setData(dataAtual);
        }
    }

    function showTimer(mode) {
        setMode(mode);
        setShow(true);
    };

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    async function handleService() {
        let horarioClean = horario.replace('h', '').replace('min', '')
        const response = await api.post('criar-servico',{
            prestador_id: routeParams.prestadorId,
            usuario_id: routeParams.userId,
            especialidade_id: routeParams.especialidade_id,
            date: `${data} ${horarioClean}`
        })
        showMessage({
            message: 'Serviço solicitado com sucesso',
            type: "success",
        });
        navigation.navigate('Home')
    }

    useEffect(() => {
        async function getDisponibilidade() {
            const disponibilidade = await api.post('listar-disponibilidade', {
                prestador_id: routeParams.prestadorId
            })
            let diasDaSemanaDisponivel = [];
            for (const [key, value] of Object.entries(disponibilidade.data)) {
                (value === true) ? diasDaSemanaDisponivel.push(key) : '';
                (key === "horario_inicio") ? setHorarioInicio(value) : '';
                (key === "horario_termino") ? setHorarioTermino(value) : '';
            }
            setDiasDaSemanaDisponivel(diasDaSemanaDisponivel)
        }
        getDisponibilidade()
    }, [])

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?text=${message}&phone=${routeParams.whatsapp}`)
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: "Solicitação de serviço",
            recipients: [routeParams.email],
            body: message
        })
    }

    function renderList(response, index) {
        return (
            <List.Item
                key={index}
                style={styles.listItem}
                title={<Text style={styles.listText}>{diasDaSemanaDisponivel[index]}</Text>}
                left={() => <List.Icon color="#ddd" icon="clock" />}
                right={() => <Text style={styles.hours}>{horarioInicio.slice(0, 5)} às {horarioTermino.slice(0, 5)}</Text>}
            />
        )
    }

    return (
        <View style={styles.main}>
            <Icon size={108} name="user-circle" color="#fff" style={styles.alignSelfCenter} />
            <Text style={styles.textName}>{routeParams.name}</Text>
            <List.AccordionGroup >
                <List.Accordion titleStyle={styles.titleList} title="Expediente" id="1"
                    left={() => <List.Icon color="#ddd" icon="clock" />}
                >
                    {diasDaSemanaDisponivel.map((response, index) => renderList(response, index))}
                </List.Accordion>
            </List.AccordionGroup>

            <TouchableOpacity style={styles.linkTimer} onPress={() => showTimer('date')}>
                <Text style={styles.textTimer} ><Icon name="calendar" size={24} color="#eee" />{"  "}Escolha a data do serviço: {data}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkTimer} onPress={() => showTimer('time')} >
                <Text style={styles.textTimer}><AntDesign name="clockcircleo" size={22} color="#eee" />{"  "}Escolha o horário do serviço: {horario}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleService} style={styles.button}>
                <View style={styles.buttonService}>
                    <IconMaterial size={26} name="work" color="#eee" style={styles.icon} />
                    <Text style={styles.text}>Solicitar Serviço</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionWhatsapp} onPress={sendWhatsapp}>
                    <View style={styles.buttonService} >
                        <Icon size={26} name="whatsapp" color="#eee" />
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionEmail} onPress={sendMail}>
                    <View style={styles.buttonService}>
                        <Icon size={26} name="envelope" color="#eee" />
                        <Text style={styles.actionText}>Email</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {show && (<DateTimePicker
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display='default'
                onChange={onChange}
            />)}
        </View>)
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#393355",
        justifyContent: 'flex-start',
        paddingTop: 35
    },
    textName: {
        marginTop: 18,
        fontSize: 26,
        marginBottom: 8,
        color: '#fff',
        fontFamily: "Roboto_900Black_Italic",
        textAlign: 'center'
    },
    button: {
        backgroundColor: "#3b5980",
        borderRadius: 70,
        marginBottom: 15,
        alignSelf: 'center',
        position: "absolute",
        bottom: 80
    },
    text: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 18,
        height: 60,
        width: 200,
        paddingTop: 18,
        paddingStart: 25
    },
    buttonService: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        paddingStart: 32,
    },
    actions: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },

    actionWhatsapp: {
        backgroundColor: '#34af20',
        borderRadius: 8,
        height: 50,
        width: '46%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionEmail: {
        backgroundColor: '#dd4b00',
        borderRadius: 8,
        height: 50,
        width: '46%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: "Roboto_900Black_Italic",
        paddingStart: 5
    },
    listItem: {
        width: "100%",
        alignSelf: 'auto',
        height: 30,
        marginVertical: 2,
        borderRadius: 5,
    },
    listText: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 14,
    },

    alignSelfCenter: {
        alignSelf: 'center'
    },
    titleList: {
        color: '#fff',
        fontFamily: "Roboto_900Black_Italic",
    },
    hours: {
        color: '#ddd',
        paddingTop: 20,
    },
    linkTimer: {
        paddingTop: 25,
        marginStart: 25
    },
    textTimer: {
        fontFamily: "Roboto_900Black_Italic",
        color: '#fff',
        fontSize: 15.5,
    }
})
