import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';

import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { handleAppwriteUpError } from '../../utils/handleErrors';

// Função de validação
const validateForm = (form) => {
  const { username, email, password } = form;

  if (!username.trim() || !email.trim() || !password.trim()) {
    Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos para continuar.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert("E-mail inválido", "Por favor, insira um endereço de e-mail válido.");
    return false;
  }

  if (password.length < 8) {
    Alert.alert("Senha muito curta", "Sua senha deve ter pelo menos 8 caracteres.");
    return false;
  }

  return true;
};

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async () => {
    if (!validateForm(form)) {
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await createUser(form.email, form.password, form.username);
      
      if (!result) {
        throw new Error("Não foi possível criar o usuário");
      }
      
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
      
    } catch (error) {
      handleAppwriteUpError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.mainView}>
          <Text style={styles.defaultMainText}>Criar sua conta</Text>
          <Text style={styles.defaultText}>
            Participe da nossa comunidade e compartilhe fotos dos seus outfits favoritos, 
            explore artigos exclusivos sobre as últimas tendências e interaja com outros 
            apaixonados pelo assunto!
          </Text>

          <FormField 
            title="Nome completo"
            value={form.username}
            placeholder="Digite seu nome completo"
            handleChangeText={(text) => setForm(prev => ({ ...prev, username: text }))}
            autoCapitalize="words"
          />
          <FormField 
            title="Endereço e-mail"
            value={form.email}
            placeholder="Digite seu e-mail"
            handleChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField 
            title="Senha"
            value={form.password}
            placeholder="Digite sua senha"
            handleChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
            autoCapitalize="none"
          />

          <CustomButton
            title="Inscrever-se"
            handlePress={submit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />

          <View style={styles.authView}>
            <Text style={styles.textAuthView}>Tem uma conta?</Text>
            <Link style={styles.linkAuthView} href="/sign-in">Conecte-se</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainView: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 30,
    minHeight: Dimensions.get("window").height - 100,
  },
  defaultMainText: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 28,
    marginBottom: 12,
  },
  defaultText: {
    fontFamily: 'Poppins-Medium',
    color: '#414141',
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 24,
  },
  authView: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  textAuthView: {
    fontFamily: 'Poppins-Medium',
    color: '#414141',
  },
  linkAuthView: {
    fontFamily: 'Poppins-Bold',
    color: '#F65AEF',
  },
});

export default SignUp;