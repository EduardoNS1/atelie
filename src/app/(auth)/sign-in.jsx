import { StyleSheet, SafeAreaView, Text, Image, View, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import { FormField, CustomButton } from '../../components';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { handleAppwriteInError } from '../../utils/handleErrors';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      handleAppwriteInError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.imageView}>
            <Image
              source={images.signin}
              style={{ width: 600, height: 190 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ flex: 2 }}>
            <Text style={styles.defaultMainText}>Bem-vindo de volta!</Text>
            <Text style={styles.defaultText}>Para continuar, por favor insira seus dados de login abaixo</Text>

            <FormField 
              title="Email"
              value={form.email}
              placeholder="Endereço e-mail"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField 
              title="Senha"
              value={form.password}
              placeholder="Senha"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              autoCapitalize="none"
            />
            
            <CustomButton
              title="Entrar"
              handlePress={submit}
              isLoading={isSubmitting}
            />

            <View style={styles.authView}>
              <Text style={styles.textAuthView}>Não tem uma conta?</Text>
              <Link style={styles.linkAuthView} href="/sign-up">Cadastre-se</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    height: '100%',
    backgroundColor: "#FFFFFF"
  },
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 0,
    marginBottom: 10,
    minHeight: Dimensions.get("window").height - 100
  },
  imageView: {
    alignItems: 'center',
    flex: 1 
  },
  defaultMainText: {
    fontFamily: 'Poppins-Bold',
    width: '100%',
    color: '#000000',
    fontSize: 28,
    marginBottom: 10
  },
  defaultText: {
    fontFamily: 'Poppins-Medium',
    width: '100%',
    color: '#414141',
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 5
  },
  authView: {
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3
  },
  textAuthView: {
    fontFamily: 'Poppins-Medium',
    color: '#414141'
  },
  linkAuthView: {
    fontFamily: 'Poppins-Bold',
    color: '#F65AEF'
  }
});

export default SignIn;