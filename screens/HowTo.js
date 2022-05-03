import React from "react";
import useState from "react";
import { Alert, TextInput, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Button, NativeBaseProvider, Box, Circle } from "native-base";

const HowTo = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <View style={Estilo.ContenedorModal}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert("Hasta la proxima c:");
                    setShowModal(!showModal);
                }}
                >
                <View>
                    <Text>Bienvenido</Text>
                    <Text>AQUI SE MUESTRAN LAS DIFERENTES INSTRUCCIONES PARA MANEJAR LA APLICACION")</Text>
                    <Button>{"<-"}</Button>
                    <Button>X</Button>
                    <Button>{"->"}</Button>
                </View>
            </Modal>
        </View>
    );
}



//CSS
const Estilo = StyleSheet.create({
    ContenedorModal: {
        backgroundColor: '#ffff',
        width: 500,
        height: 500,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    Marco: {
        backgroundColor: '#fff',
        padding: 8,
        margin: 4,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 15,
        height: 150,
        width: 300,
    },
    Titulo: {
        backgroundColor: '#646',
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        borderRadius: 10
    },
    Texto: {
        backgroundColor: '#a64',
        color: 'white',
        padding: 14,
        fontWeight: 'bold',
        borderRadius: 8,
        margin: 2,
        height: 50,
        width: '70%',
    },
});

export default HowTo;