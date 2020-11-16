import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { FontAwesome as Icon } from '@expo/vector-icons'
import { MaterialIcons as IconMaterial } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

export default function PrestadorDetails() {
    const route = useRoute();
    const routeParams = route.params;
    const navigation = useNavigation();
    const message = `Olá ${routeParams.name} estou entrando em contato porque gostaria de contratar os seus serviços!`
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

    return (
        <View style={styles.main}>
            <Icon size={108} name="user-circle" color="#fff" />
            <Text style={styles.textName}>{routeParams.name}</Text>
            <TouchableOpacity style={styles.button}>
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
        </View>)
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#393355",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textName: {
        marginTop: 25,
        fontSize: 26,
        marginBottom: 25,
        color: '#fff',
        fontFamily: "Roboto_900Black_Italic",
        textAlign: 'center'
    },
    button: {
        backgroundColor: "#3b5980",
        borderRadius: 70,
        marginBottom: 15
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
        paddingStart: 32
    },
    actions: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
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
        paddingStart:5
    },
})
