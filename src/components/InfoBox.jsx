import { StyleSheet, View, Text } from "react-native";

const InfoBox = ({ title, subtitle }) => {
    return(
        <View>
            <Text style={styles.textTitle}>{title}</Text>
            <Text>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textTitle: {
        fontFamily: 'Poppins-SemiBold',
    },
    textSubtitle: {
        fontFamily: 'Poppins-Regular',
    },
});

export  default InfoBox;