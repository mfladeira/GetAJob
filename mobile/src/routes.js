import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import TipoServico from './pages/TipoServico'
import Especialidades from './pages/Especialidades'
import ListaPrestadores from './pages/Lista_Prestadores';
import PrestadorDetails from './pages/PrestadorDetails';
import Disponibilidade from './pages/Disponibilidade';

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Register' component={Register} />
                <AppStack.Screen name="TipoServico" component={TipoServico} />
                <AppStack.Screen name="Especialidades" component={Especialidades} />
                <AppStack.Screen name="ListaPrestadores" component={ListaPrestadores} />
                <AppStack.Screen name="PrestadorDetails" component={PrestadorDetails} />
                <AppStack.Screen name="Disponibilidade" component={Disponibilidade} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}