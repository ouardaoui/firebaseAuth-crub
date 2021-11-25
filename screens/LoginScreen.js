import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase';



const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigation = useNavigation()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        navigation.navigate("HomeScreen")
        // ...
      } else {
        // User is signed out
        // ...
      }
      return unsub
    }, []);

  })

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, pwd)

      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        alert(error.message)
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="email" style={styles.input} />
        <TextInput value={pwd} onChangeText={text => setPwd(text)} placeholder="password" style={styles.input} secureTextEntry />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity >
        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",

    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2
  },
  buttonOutlineText: {
    color: "#0782F9",

    fontSize: 16,
  },
})
