import { StyleSheet, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({
    title,
    handlePress,
    isLoading,
}) => {
    return (
        <LinearGradient style={{ marginTop: 28, minHeight: 64, borderRadius: 12, justifyContent: 'center', alignContent: 'center' }}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#F8B6F5', '#F65AEF']}
        >
            <TouchableOpacity
                style={styles.touchableOpacity1}
                onPress={handlePress}
                activeOpacity={0.7}
                disabled={isLoading}
            >
                <Text style={styles.title}>{title}</Text>

                {isLoading && (
                <ActivityIndicator
                    style={{ marginLeft: 100 }}
                    animating={isLoading}
                    color="#000"
                    size="large"
                />
                )}
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    touchableOpacity: {
        marginTop: 28,
        backgroundColor: 'red',
        borderRadius: 12,
        minHeight: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableOpacity1: {
        marginTop: 0,
        borderRadius: 12,
        minHeight: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18
    }
})

export default CustomButton;