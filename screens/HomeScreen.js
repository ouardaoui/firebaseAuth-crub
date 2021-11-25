import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { auth, db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";
import { Feather } from '@expo/vector-icons';



const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [info, setInfo] = useState("")
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("IndexScreen")}>
          <Feather style={styles.header} name="list" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

  }, [])


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("LoginScreen")
      })
      .catch(error => alert(error.message))
  }

  const addInfo = async (name, age, info) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        age,
        info,

      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setAge("")
    setInfo("")
    setName("")

  }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TextInput value={name} style={styles.input} onChangeText={(name) => setName(name)} placeholder="name" />
      <TextInput value={age} style={styles.input} onChangeText={(age) => setAge(age)} placeholder="age" />
      <TextInput value={info} style={styles.input} onChangeText={(info) => setInfo(info)} placeholder="put some info" />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("IndexScreen")
          addInfo(name, age, info)

        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',

    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  header: {
    marginRight: 20
  },
})

export default HomeScreen