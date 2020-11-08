import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Home() {
    const route = useRoute()
    const routeParams = route.params

    return (
        <Text>
            {routeParams.email}
        </Text>
    )
}