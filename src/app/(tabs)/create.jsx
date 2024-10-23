import { useEffect, useState } from "react";
import { Link, router } from 'expo-router'
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Alert, Image, TouchableOpacity, ScrollView, Platform } from "react-native"

import { icons } from "../../constants";
import { createPost } from "../../lib/appwrite";
import DescriptionFormField from "../../components/DescriptionFormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import TestFormField from "../../components/TestFormField";

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    description: "",
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video.gif"],
    })

    if (!result.canceled) {
      if (selectType == "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Lembre-se: você precisa selecionar uma foto para avançar")
      }, 100)
    }
  }

  const submit = async () => {
    if (
      (form.description === "") |
      (form.title === "") |
      !form.thumbnail
    ) {
      return Alert.alert("Quase lá! Apenas preencha todos os campos para continuar.")
    }

    setUploading(true)
    try {
      await createPost({
        ...form,
        userId: user.$id,
      })

      Alert.alert("Sucess", "Post uploaded succesfully")
      router.push("/home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        title: "",
        thumbnail: null,
        description: "",
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          <View style={styles.mainView}>

            <View style={styles.returnButtonView}>
                <Link style={{ height: 30 }} href="/home">
                  <Image
                    source={icons.arrowback}
                    resizeMode="contain"
                    style={styles.uploadReturnIcon}
                  />
                </Link>
            </View>

            <View style={styles.uploadContainer}>
              <TouchableOpacity onPress={() => openPicker("image")}>
                {form.thumbnail ? (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    resizeMode="cover"
                    style={styles.thumbnailPreview}
                  />
                ) : (
                  <View style={styles.thumbnailPlaceholder}>
                    <Image
                      source={icons.cameraicon}
                      resizeMode="contain"
                      style={styles.uploadIconSmall}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            <TestFormField
              value={form.title}
              placeholder="Dê um nome para sua criação..."
              handleChangeText={(e) => setForm({ ...form, title: e })}
              otherStyles={styles.formField}
            />

            <DescriptionFormField
              value={form.description}
              placeholder="Este é seu momento de brilhar! Conte-nos tudo sobre essa produção..."
              handleChangeText={(e) => setForm({ ...form, description: e })}
              otherStyles={styles.formField}
            />

            <CustomButton
              title="Enviar & Publicar"
              handlePress={submit}
              containerStyles={styles.submitButton}
              isLoading={uploading}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  returnButtonView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  formField: {
    marginTop: 10,
  },
  uploadContainer: {
    marginTop: 7,
    spaceY: 2,
  },
  label: {
    fontSize: 6,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  videoPreview: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  uploadPlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderColor: '#F65AEF',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '50%',
    height: '50%',
  },
  thumbnailPreview: {
    width: '100%',
    height: 340,
  },
  thumbnailPlaceholder: {
    marginTop: 10,
    width: '100%',
    height: 340,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconSmall: {
    width: 80,
    height: 80,
  },
  uploadReturnIcon: {
    width: 25,
    height: 25,
  },
  chooseFileText: {
    fontSize: 27,
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },
  submitButton: {
    marginTop: 20,
  },
  viewTextInput: {
    height: 200,
    color: '#000'
  }
})

export default Create
