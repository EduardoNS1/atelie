import { useEffect, useState } from "react"
import { Link, router } from 'expo-router'
import * as DocumentPicker from "expo-document-picker"
import { SafeAreaView } from "react-native-safe-area-context"
import { 
  StyleSheet, 
  View, 
  Text, 
  Alert, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Platform,
  ActivityIndicator
} from "react-native"

import { icons } from "../../constants"
import { createPost } from "../../lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider"
import ModernFormField from "../../components/ModernFormField"
import LongTextFormField from "../../components/LongTextFormField"

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    title: "",
    thumbnail: null,
    description: "",
  })

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    })

    if (!result.canceled) {
      setForm({
        ...form,
        thumbnail: result.assets[0],
      })
      setErrors({ ...errors, thumbnail: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.title.trim()) {
      newErrors.title = "O título é obrigatório"
    }
    if (!form.description.trim()) {
      newErrors.description = "A descrição é obrigatória"
    }
    if (!form.thumbnail) {
      newErrors.thumbnail = "Uma imagem é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async () => {
    if (!validateForm()) {
      Alert.alert(
        "Campos Incompletos",
        "Por favor, preencha todos os campos obrigatórios",
        [{ text: "OK" }]
      )
      return
    }

    setUploading(true)
    try {
      await createPost({
        ...form,
        userId: user.$id,
      })

      Alert.alert(
        "Sucesso!", 
        "Sua publicação foi criada com sucesso!", 
        [{ text: "OK", onPress: () => { router.push("/home") }}]
      )
    } catch (error) {
      Alert.alert(
        "Erro", 
        "Não foi possível criar sua publicação. Tente novamente.",
        [{ text: "OK" }]
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.imageSection}>
          <TouchableOpacity 
            onPress={openPicker}
            style={[
              styles.uploadContainer,
              errors.thumbnail && styles.uploadContainerError
            ]}
            activeOpacity={0.7}
          >
            {form.thumbnail ? (
              <>
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.changeOverlay}>
                  <Image
                    source={icons.cameraicon}
                    style={styles.overlayIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.overlayText}>Trocar Imagem</Text>
                </View>
              </>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Image
                  source={icons.cameraicon}
                  style={styles.uploadIcon}
                  resizeMode="contain"
                />
                <Text style={styles.uploadText}>
                  Toque para adicionar uma imagem
                </Text>
                <Text style={styles.uploadSubtext}>
                  PNG, JPG ou JPEG
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.thumbnail && (
            <Text style={styles.errorText}>{errors.thumbnail}</Text>
          )}
        </View>

        <View style={styles.formSection}>
          <ModernFormField
            title="Título"
            value={form.title}
            handleChangeText={(text) => {
              setForm({ ...form, title: text })
              setErrors({ ...errors, title: null })
            }}
            error={errors.title}
            required
            maxLength={100}
          />

          <LongTextFormField
            title="Descrição"
            value={form.description}
            handleChangeText={(text) => {
              setForm({ ...form, description: text })
              setErrors({ ...errors, description: null })
            }}
            error={errors.description}
            required
            maxLength={1000}
            minLines={4}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.submitButton, uploading && styles.submitButtonDisabled]}
            onPress={submit}
            disabled={uploading}
            activeOpacity={0.7}
          >
            {uploading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Publicar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    marginLeft: 12,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    marginBottom: 8,
  },
  imageSection: {
    marginBottom: 24,
  },
  uploadContainer: {
    width: '100%',
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'solid',
  },
  uploadContainerError: {
    borderColor: '#FF4646',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  changeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayIcon: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
    marginBottom: 8,
  },
  overlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  uploadPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: 48,
    height: 48,
    tintColor: '#666666',
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#8B8B8B',
    fontFamily: 'Poppins-Regular',
  },
  formSection: {
    marginBottom: 24,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FF4646',
  },
  submitButton: {
    backgroundColor: '#F65AEF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#F65AEF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
})

export default Create