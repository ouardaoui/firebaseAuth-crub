import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Feather } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";


const IndexScreen = ({ route, navigation }) => {

  const [users, setUsers] = useState([])
  if (route.params !== undefined) {
    const { name, age, info, key } = route.params;
    users.map(user => {
      if (user.key === key) {
        user.name = name
        user.age = age
        user.info = info
      }
    })
  }
  const asyncFuntion = async () => {
    const user = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      user.push({
        ...doc.data(),
        key: doc.id,
      });
      setUsers(user)


    });

    return querySnapshot
  }

  useEffect(() => {
    asyncFuntion()
  }, [])




  const deleteInfo = async (key) => {
    await deleteDoc(doc(db, "users", key));
    const user = users.filter((user) => user.key !== key)
    setUsers(user)
  }

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(user) => user.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("ShowScreen", { user: item })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity onPress={() => { deleteInfo(item.key) }}>
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
}



const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray"
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  },
  header: {
    marginRight: 20
  }
})
export default IndexScreen