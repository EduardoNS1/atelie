import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Animated, Platform } from "react-native";
import React, { useState, useRef, useEffect } from "react";

import { icons } from "../constants";

const ModernFormField = ({ title, value, placeholder, handleChangeText, error, helperText, required, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25]
        })
      }
    ],
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12]
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#8B8B8B', '#F65AEF']
    })
  };

  const borderColor = error ? '#FF4646' : isFocused ? '#F65AEF' : '#E0E0E0';

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        { borderColor },
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError
      ]}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {title} {required && <Text style={styles.required}>*</Text>}
        </Animated.Text>
        
        <TextInput
          style={[
            styles.input,
            props.multiline && styles.multilineInput
          ]}
          value={value}
          placeholder={isFocused ? placeholder : ""}
          placeholderTextColor="#8B8B8B"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Senha' && !showPassword}
          {...props}
        />

        {title === 'Senha' && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            <Image 
              source={!showPassword ? icons.eye : icons.eyeHide} 
              style={styles.icon} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[
          styles.helperText,
          error && styles.errorText
        ]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    minHeight: 56,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputContainerFocused: {
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  inputContainerError: {
    borderWidth: 2,
    backgroundColor: '#FFF5F5',
  },
  label: {
    position: 'absolute',
    left: 16,
    top: 28,
    fontFamily: 'Poppins-Medium',
    backgroundColor: 'transparent',
  },
  required: {
    color: '#ea88e6',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 40,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#8B8B8B',
  },
  helperText: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  errorText: {
    color: '#FF4646',
    fontFamily: 'Poppins-Medium',
  },
});

export default ModernFormField;