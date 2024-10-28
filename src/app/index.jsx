import { StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import COLORS from "../constants/colors";

import { images } from "../constants";
import  { CustomButton } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App(){
    const {loading, isLogged} = useGlobalContext();
    if(!loading && isLogged) return <Redirect href="/home" />

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.mainView}>
                    <Image
                        source={images.logo}
                        style={{ width: scale(120), height: verticalScale(70) }}
                        resizeMode="contain"
                    />

                    <Image 
                        source={images.cards}
                        style={{ height: verticalScale(360), width: moderateScale(360) }}
                        resizeMode="contain"
                    />

                    <Text style={styles.defaultText}>{`Transforme sua paixão por moda em uma experiência compartilhada!\nJunte-se a nós para exibir seu estilo único e explorar conteúdos cuidadosamente escolhidos para inspirar sua jornada fashion.`}</Text>

                    <View style={styles.buttonRouterView}>
                        <CustomButton
                            title="Continuar"
                            handlePress={() => router.push('/sign-up')}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
    scrollView: {
        minHeight: '85vh',
        height: '100%',
    },
    mainView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: moderateScale(18),
        paddingRight: moderateScale(18),
        display: 'flex',
    },
    defaultText: {
        fontFamily: 'Poppins-Medium',
        width: '100%',
        color: '#414141',
        fontSize: 19,
        lineHeight: 24,
        marginBottom: 5,
    },
    buttonRouterView: {
        width: '100%',
    },
});