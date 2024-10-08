import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'

import React, { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
            <View style={styles.viewTextInput}>
                <TextInput
                    style={styles.textInput}
                    value={value}
                    placeholder="Search for a topic"
                    placeholderTextColor={"#8B8B8B"}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Senha' && !showPassword}
                    {... props}
                />

                <TouchableOpacity>
                    <Image 
                        source={icons.search}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
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

export default SearchInput