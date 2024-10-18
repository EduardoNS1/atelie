import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const Bookmark = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>Artigos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    paddingHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#yourPrimaryColor',
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Bookmark;
