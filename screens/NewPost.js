import React from "react";
import { Alert, TextInput, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Button, NativeBaseProvider, Box, Circle } from "native-base";

const NewPost = ({navigation}) => {

    return (
        <NativeBaseProvider style = {Estilo.Contenedor}>
                <Box>
                    <Stack direction = "column" space = {4} style = {Estilo.Contenedor}> 
                        <Stack style = {Estilo.BordeExterior} direction = "column" space = {2}>
                            <Text style = {Estilo.Titulo}>Topico:</Text>
                            <TextInput style = {Estilo.Inputs} editable maxLength={40} >Topico</TextInput>
                            </Stack>
                        <Stack style = {Estilo.BordeExterior} direction = "column" space = {2}>
                            <Text style = {Estilo.Titulo}>Descripcion:</Text>
                            <TextInput multiline style = {Estilo.Inputs} editable maxLength={300} >Descripcion del Topico</TextInput>
                            </Stack>
                        <Stack style = {Estilo.BordeExterior} direction = "column" space = {2}>    
                            <Text style = {Estilo.Titulo}>Tags:</Text>
                            <TextInput style = {Estilo.Inputs} editable maxLength={40} >Tags</TextInput>
                            </Stack>
                        <Button style = {Estilo.BotonAceptar} onPress = {() => {Alert.alert("Guardado","¿Seguro que deseas guardar?", 
                            [
                                {
                                    text: "No",
                                    onPress: () => console.log("Cancelado")
                                    },
                                { 
                                    text: "Si", 
                                    onPress: () => console.log("En Proceso") 
                                    }
                                ])}}>Publicar</Button>
                        </Stack>
                    </Box>
              
            </NativeBaseProvider>

    );
}

//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#0df',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        },
    Inputs: {
        backgroundColor: 'black',
        color: 'white',
        width: 200,
        height: 50,
        justifyContent: "center",
        borderRadius: 20,
        padding: 4,
        margin: 5,
        borderColor: 'red',
        borderWidth: 1,
        },
    Titulo: {
        padding: 2,
        marginLeft: 6,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        borderRadius: 10
        },
    BordeExterior: {
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 20,
        backgroundColor: 'white'
    },
    BotonAceptar: {
        backgroundColor: '#000',
        padding: 8,
        margin: 0,
        color: 'white',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: 15,
        height: 60,
        width: '94%',
        },
    Marco: {
        borderRadius: 80
    },
    });



export default NewPost;