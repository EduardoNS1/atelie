import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router"; 

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname(); // Obtém o pathname atual da rota
    const [query, setQuery] = useState(initialQuery || ""); // Define o estado para a query inicial

    return (
        <View style={styles.viewTextInput}>
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Search for a topic"
                placeholderTextColor={"#8B8B8B"}
                onChangeText={(e) => setQuery(e)} // Atualiza o estado quando o texto muda
            />

            <TouchableOpacity
                onPress={() => {
                    if (query === "") // Verifica se a query está vazia
                        return Alert.alert(
                            "Missing Query",
                            "Please input something to search results across database"
                        )
                    
                    // Redireciona para a página de busca com a query
                    if (pathname.startsWith("/search")) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}>
                <Image 
                    source={icons.search}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    spaceBetween: {
        marginTop: 8,
    },
    title: {
        marginTop: 12,
        marginBottom: 8,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: '#000000',
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
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
    },
});

export default SearchInput;
