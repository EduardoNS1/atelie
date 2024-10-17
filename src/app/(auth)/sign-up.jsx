import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions, Alert } from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {
    const { setUser, setIsLogged } = useGlobalContext()

    const [isSubmitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
      username: "",
      email: "",
      password: "",
    })

    const submit = async () => {
      if(form.username === "" || form.email === "" || form.password === ""){
        Alert.alert("Error", "Please fill in all fields")
      }

      setSubmitting(true)
      try {
        const result = await createUser(form.email, form.password, form.username)
        setUser(result)
        setIsLogged(true)

        router.replace("/home")
      } catch (error) {
        Alert.alert("Error", error.message)        
      }finally{
        setSubmitting(false)
      }
    }

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          <View style={styles.mainView}>
  
            <Text style={styles.defaultMainText}>Criar sua conta</Text>
            <Text style={styles.defaultText}>Participe da nossa comunidade e compartilhe fotos dos seus outfits favoritos, explore artigos exclusivos sobre as últimas tendências e interaja com outros apaixonados pelo assunto!</Text>

            <FormField 
              title="Nome completo"
              value={form.username}
              placeholder="Nome completo"
              handleChangeText={(e) => setForm({ ...form, username: e})}
            />
            <FormField 
              title="Endereço e-mail"
              value={form.email}
              placeholder="Endereço e-mail"
              handleChangeText={(e) => setForm({ ...form, email: e})}
            />
            <FormField 
              title="Senha"
              value={form.password}
              placeholder="Senha"
              handleChangeText={(e) => setForm({ ...form, password: e})}
            />
            <CustomButton
              title="Inscrever-se"
              handlePress={submit}
              isLoading={isSubmitting}
            />

            <View style={styles.authView}>
              <Text style={styles.textAuthView}>Tem uma conta?</Text>
              {/* <Link style={styles.linkAuthView} href="/sign-in">Conecte-se</Link> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeAreaView: {
    height: '100%',
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    marginBottom: 50,
    marginTop: 30,
    minHeight: Dimensions.get("window").height - 100
  },
  defaultMainText: {
    fontFamily: 'Poppins-Bold',
    color: '#000000',
    fontSize: 28,
    marginBottom: 12
  },
  defaultText: {
    fontFamily: 'Poppins-Medium',
    color: '#414141',
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 12
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
})


export default SignUp