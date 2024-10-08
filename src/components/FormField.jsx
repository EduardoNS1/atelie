import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'

import React, { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View style={styles.spaceBetween}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#8B8B8B"}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Senha' && !showPassword}
                    {... props}
                />

                {title === 'Senha' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} style={{ width: 24, height: 24 }} resizeMode="contain" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    spaceBetween: {
        marginTop: 8
    },
    title: {
        marginTop: 12,
        marginBottom: 8,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#000000'
    },
    viewTextInput: {
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(147, 187, 255, 0.12)',
        height: 64,
        backgroundColor: 'rgba(147, 187, 255, 0.12)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
    }
})

export default FormField