import { StyleSheet, View, Text, Image } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

import { images } from '../constants'

import CustomButton from './CustomButton'

const EmptyState = ({ title, subtitle }) => {
    return(
        <View style={styles.view}>
            <Text>EmptyState</Text>
            <Image
                source={images.empty}
                style={{ width: 270, height: 216 }}
                resizeMode='contain'
            />
            <Text>{title}</Text>
            <Text>{subtitle}</Text>

            <CustomButton 
                title="Create"
                handlePress={() => router.push('/create')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EmptyState