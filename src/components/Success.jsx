import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import { images } from '../constants'

const Success = ({ title, message }) => {
    return(
        <View style={styles.view}>
            <Image
                style={{ marginTop: 60 }} 
                source={images.success}
            />
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textMessage}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontFamily: 'Poppins-Bold',
        color: '#000000',
        fontSize: 32,
        marginTop: 50,
        marginBottom: 10
    },
    textMessage: {
        fontFamily: 'Poppins-Medium',
        color: '#414141',
        fontSize: 19,
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'center'
    }
})

export default Success