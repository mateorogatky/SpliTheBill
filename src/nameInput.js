import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addName, getNames, removeName } from "./redux/namesSlices";

const NameInput = () => {
  const names = useSelector((state) => state.names);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAddName = () => {
    if (name) {
      dispatch(addName(name)); // Deja esto como está
      setName("");
  
      axios
        .post("http://192.168.1.164:3000/api/names", { name })
        .then((response) => {
          console.log("Nombre agregado con éxito:", response.data);
        })
        .catch((error) => {
          console.error("Error al agregar el nombre:", error);
        });
    }
  };

  const handleDeleteName = (name) => {
    axios
      .delete(`http://192.168.1.164:3000/api/names/${name}`)
      .then(() => {
        console.log("Nombre eliminado con éxito");

        // Después de eliminar el nombre con éxito, obtén la lista actualizada de nombres
        axios
          .get("http://192.168.1.164:3000/api/names")
          .then((response) => {
            dispatch(getNames(response.data));
          })
          .catch((error) => {
            console.error("Error al obtener los nombres:", error);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar el nombre:", error);
      });
  };

  useEffect(() => {

    axios
      .get("http://192.168.1.164:3000/api/names")
      .then((response) => {
        dispatch(getNames(response.data));

      })
      .catch((error) => {
        console.error("Error al obtener los nombres:", error);
      });
  }, [dispatch]);


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <Button title="Add" onPress={handleAddName} />
      <Text style={styles.heading}>Names:</Text>
      <FlatList
        data={names.names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.nameItem}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleDeleteName(item.name)}
              style={styles.deleteButton}
              
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nameItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
});

export default NameInput;
