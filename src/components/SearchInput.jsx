import { StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router"; 

import { Feather } from '@expo/vector-icons';

const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname(); // Obtém o pathname atual da rota
    const [query, setQuery] = useState(initialQuery || ""); // Define o estado para a query inicial

    return (
        <View style={styles.viewTextInput}>
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Procurar por um post"
                placeholderTextColor={"#8B8B8B"}
                onChangeText={(e) => setQuery(e)} // Atualiza o estado quando o texto muda
            />

            <TouchableOpacity
                onPress={() => {
                    if (query === "") // Verifica se a query está vazia
                        return Alert.alert(
                            "Nada encontrado",
                            "Digite um termo para filtrar as postagens que você procura."
                        )
                    
                    // Redireciona para a página de busca com a query
                    if (pathname.startsWith("/search")) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}>
                <Feather name="search" size={32} color="#383838" />
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
        color: '#1A1A1A',
    },
    viewTextInput: {
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: 64,
        backgroundColor: '#FFF',
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
