import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { db } from '../firebase'
import { doc, updateDoc } from "firebase/firestore";



const EditScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name)
  const [age, setAge] = useState(user.age)
  const [info, setInfo] = useState(user.info)


  const handleEdit = async (name, age, info, callback) => {
    const Ref = doc(db, "users", user.key);

    // Set the "capital" field of the city 'DC'
    await updateDoc(Ref, {
      name,
      age,
      info
    });
    if (callback) {
      callback();
    }
  }
  return (
    <View style={styles.container}>
      <TextInput value={name} style={styles.input} onChangeText={(name) => setName(name)} placeholder="name" />
      <TextInput value={age} style={styles.input} onChangeText={(age) => setAge(age)} placeholder="age" />
      <TextInput value={info} style={styles.input} onChangeText={(info) => setInfo(info)} placeholder="put some info" />

      <TouchableOpacity
        onPress={() => handleEdit(name, age, info, navigation.navigate("IndexScreen", { name, age, info, key: user.key }))}
        style={styles.button}
      >
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>

    </View>
  )
}

export default EditScreen

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
})
