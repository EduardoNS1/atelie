import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Alert, Image, TouchableOpacity, ScrollView } from "react-native"

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
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

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields")
    }

    setUploading(true)
    try {
      await createVideoPost({
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
        video: null,
        thumbnail: null,
        prompt: "",
      })

      setUploading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.mainView}>
          <Text style={styles.title}>Upload Video</Text>

          <FormField
            title="Video Title"
            value={form.title}
            placeholder="Give your video a catchy title..."
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles={styles.formField}
          />

          <View style={styles.uploadContainer}>
            <Text style={styles.label}>Upload Video</Text>

            <TouchableOpacity onPress={() => openPicker("video")}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  style={styles.videoPreview}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <View style={styles.uploadIconContainer}>
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      style={styles.uploadIcon}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.uploadContainer}>
            <Text style={styles.label}>Thumbnail Image</Text>

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
                    source={icons.upload}
                    resizeMode="contain"
                    style={styles.uploadIconSmall}
                  />
                  <Text style={styles.chooseFileText}>Choose a file</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The AI prompt of your video...."
            handleChangeText={(e) => setForm({ ...form, prompt: e })}
            otherStyles={styles.formField}
          />

          <CustomButton
            title="Submit & Publish"
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
    fontSize: 16,
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
    height: 256,
    borderRadius: 16,
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: 64,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    borderColor: '#ccc',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconSmall: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  chooseFileText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  submitButton: {
    marginTop: 20,
  },
})

export default Create
