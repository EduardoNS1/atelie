import { StyleSheet, View, Text, TextInput, Animated, Platform } from "react-native";
import { useState, useRef, useEffect } from "react";

const LongTextFormField = ({ title, value, placeholder, handleChangeText, maxLength = 1000, minLines = 4, error, helperText, required, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start()
  }, [isFocused, value])

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
  }

  const borderColor = error ? '#FF4646' : isFocused ? '#F65AEF' : '#E0E0E0'
  const characterCount = value ? value.length : 0
  
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
            {
              height: Math.max(
                styles.input.minHeight,
                contentHeight,
                minLines * 24 // Altura aproximada por linha
              )
            }
          ]}
          value={value}
          placeholder={isFocused ? placeholder : ""}
          placeholderTextColor="#8B8B8B"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChangeText}
          onContentSizeChange={(event) => {
            setContentHeight(event.nativeEvent.contentSize.height)
          }}
          multiline
          textAlignVertical="top"
          maxLength={maxLength}
          {...props}
        />
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {characterCount}/{maxLength} caracteres
          </Text>
        </View>
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
    zIndex: 1,
  },
  required: {
    color: '#ea88e6',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    paddingVertical: 8,
    paddingTop: 16,
    lineHeight: 24,
    minHeight: 90, // Altura mínima para 3 linhas aproximadamente
    textAlignVertical: 'top',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
  },
  statsText: {
    fontSize: 12,
    color: '#8B8B8B',
    fontFamily: 'Poppins-Regular',
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

export default LongTextFormField;