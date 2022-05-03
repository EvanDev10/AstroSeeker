import React from "react";
import {useState} from "react";
import { SafeAreaView, TextInput,TouchableOpacity, Alert, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Button, NativeBaseProvider, Box, Divider } from "native-base";


const ShowPost = ({navigation}) => {

    const BotonFlotante = () =>{
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=> { 
                            (showModal) ? setShowModal(!showModal) : setShowModal(!showModal);
                            console.log(showModal)
                            }}
                        style={Estilo.TouchableFlotante}>
                        <Image
                            source={require("./../assets/Chat.png")}
                            style={Estilo.BotonFlotante}/>
                    </TouchableOpacity>
                    
                    </View>
            </SafeAreaView>
        );
    }

    const Comentarios = () => {

        const Datos = [
            {
                id: 1,
                idAut: 1,
                Autor: "Javier", 
                Comentario: "Me gusta :D"
                },
            {
                id: 2,
                idAut: 1,
                Autor: "Javier", 
                Comentario: "Sigue Asi"
                },
            {
                id: 3,
                idAut: 1,
                Autor: "Javier", 
                Comentario: "Sigue Asi"
                },    
            ]

        const Contenido = (item) => {
            return (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                    Alert.alert("Hasta la proxima c:");
                        setShowModal(!showModal);
                    }}
                    >
                    <View style = {Estilo.EstiloModal}>
                        <Stack style = {{ padding: 4, alignItems: 'center', borderWidth: 2, borderColor: 'black', borderRadius: 20 }} direction = "column" space = {3} style = {Estilo.Caratula}>
                            
                            <Stack style = {{ alignItems: 'center', borderWidth: 2, borderColor: 'black' }} direction = "row" space = {2}>
                                
                                <Stack style = {{ alignItems: 'center',}} direction = "column" space = {2}>
                                    <Image alt = "Foto" style = {{borderColor: 'black', borderWidth: 2, borderRadius: 60, width: 60, height: 60}}></Image>
                                    <Text style = {Estilo.NombreAutor}>Autor</Text>
                                    </Stack>

                                    <Text>Comentario</Text>

                                    </Stack>
                            <Stack direction = "row" space = {2}>
                                
                                <TextInput editable maxLength={200}>Deja tu opinion</TextInput>

                                <Button onPress = { () => {
                                    Alert.alert("Comentario publicado");  
                                    }  }>Enviar</Button>
                                
                                </Stack>
                            <Button onPress = { () => {
                                navigation.navigate("ShowPost");
                                setShowModal(false);
                                console.log("Cerrar");
                                }  }>Cerrar</Button>
                            </Stack>
                        </View>
                    </Modal>
            );
        }

        return (
            <View>
                <FlatList
                    data={Datos}
                    renderItem={Contenido}
                    />

                <NativeBaseProvider>
                    <Button style = {{ backgroundColor: 'blue', color: 'red' }} onPress = {() => {setShowModal(!showModal)}}>Cerrar</Button>
                    </NativeBaseProvider>
                </View>
            
            
        );
    }

    const [showModal, setShowModal] = useState(false)

    return (
        <NativeBaseProvider>
            <Box flex = {10} style = {Estilo.Contenedor}>
                   <Box flex = {10} style = {Estilo.Marco}>
                        <Text style = {Estilo.Titulo}>Titulo</Text>
                        <Divider style = {Estilo.Divider}/>
                        <Text style = {Estilo.Texto}>Aqui se presentan los parrafos (Contenido) almacenado en Firebase, una vez que ya se ha guardado por parte del usuario</Text>
                        <Image style = { { height: 300, width: 300, borderWidth: 1, borderColor: 'blue', borderRadius: 25 } } alt = "Imagen No Disponible"/>
                        <Text style = {Estilo.Texto}>Estos post manejaran Tags referente a los temas de interes, e imagenes ilustrativas</Text>
                        <Divider style = {Estilo.Divider}/>
                        <Text style = {Estilo.Titulo}>Creado por Javier</Text>
                        <Image alt = "Foto" style = {{borderColor: 'black', borderWidth: 2, borderRadius: 60, width: 60, height: 60}}></Image>
                        </Box>
                    <BotonFlotante/>
                </Box>
            <Comentarios/>
            </NativeBaseProvider>
        

    );
}


//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        },
    Marco: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 2,
        padding: 2,
        margin: 2,
        },
    Titulo: {
        fontSize: 30,
        color: 'black',
        padding: 5,
        fontWeight: 'bold'
        },
    Texto: {
        textAlign: 'justify',
        color: 'black',
        padding: 5

        },
    Divider: {
        margin: 6,
        height: 2,
        width: '95%',
    },
    TouchableFlotante: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        left: 70,
        bottom: 10,
      },
    BotonFlotante: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
      },

    EstiloModal: {
        alignItems: 'center',
        height: 500,
        width: '80%',
        margin: 20,
        padding: 20,
    },
    CajaComentario: {
        borderRadius: 1,
        borderColor: 'black',

    },
    NombreAutor: {
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    TextComentario: {
        alignItems: 'center',
    },
    InputCommentario: {
        alignItems: 'center',
    },
});


export default ShowPost;