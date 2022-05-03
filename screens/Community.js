import React from "react";
import { useState } from "react";
import { SafeAreaView, TouchableOpacity, Alert, TextInput, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Button, NativeBaseProvider, Box  } from "native-base";

    const Datos = [
        {
            Tema: "Nuevas investigaciones" ,
            Autor: "Javier",
            Siguiendo: "X",
        },
        {
            Tema: "UPDATE URGENTE" ,
            Autor: "Alan",
            Siguiendo: "O",
        },
        {
            Tema: "Aplicacion con delay" ,
            Autor: "Alejandro",
            Siguiendo: "X",
        },
        {
            Tema: "UPDATE URGENTE" ,
            Autor: "Alan",
            Siguiendo: "O",
        },
        {
            Tema: "Aplicacion con delay" ,
            Autor: "Alejandro",
            Siguiendo: "X",
        },
      ];

const Community = ({navigation}) => {
    //HowTo Propio

    const [showModal, setShowModal] = useState(false)

    const HowTo = () => {
    
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        Alert.alert("Hasta la proxima c:");
                        setShowModal(!showModal);
                    }}
                    >
                    <View style = {{alignItems: 'center', padding: 22, margin: 5}}>
                        <Text style = {{alignItems: 'center', padding: 22, margin: 5}}>Bienvenido</Text>
                        <Text style = {{alignItems: 'center', padding: 22, margin: 5}}>AQUI SE MUESTRAN LAS DIFERENTES INSTRUCCIONES PARA MANEJAR LA APLICACION")</Text>
                        <Stack space = {3} direction = 'row'>
                            <Button style = {{ width: 100}}>{"<-"}</Button>
                            <Button style = {{ width: 100}}>X</Button>
                            <Button style = {{ width: 100}}>{"->"}</Button>
                            </Stack>
                    </View>
                </Modal>
            </View>
        );
    }
    
    //Componente del foro
    const Topicos = (Valores) => {
        return (
            <View style = {Estilo.Marco}>
                <Stack direction = "column" space = {2} style = {Estilo.Caratula}>
                    <Pressable style = {{height: Estilo.Titulo.height, width: Estilo.Titulo.width}} onPress = {()=> { navigation.navigate("ShowPost") }}>
                        <Text style = {Estilo.Titulo}>Tema</Text>
                        </Pressable>
                    <Stack direction = "row" space = {2} style = {Estilo.Caratula2}>
                        <Stack direction = "row" space = {2} style = {Estilo.Caratula3}>
                            <Image alt = "Foto" style = {{borderColor: 'black', borderWidth: 2, borderRadius: 20, width: 45, height: 45}}></Image>
                            <Text style = {Estilo.Texto}>Autor</Text>
                            </Stack>
                        <Button style = {Estilo.BotonEstilo} onPress = {() => navigation.navigate("How")}>Seguir</Button>
                        </Stack>
                    </Stack>
                </View>
        );
    }

    const BotonFlotante = () =>{
        return (
            <SafeAreaView>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=> { navigation.navigate("newPost")}}
                    style={Estilo.TouchableFlotante}>
                    <Image
                        source={require("./../assets/Agregar.png")}
                        style={Estilo.BotonFlotante}/>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const BotonFlotante2 = () =>{
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=> { setShowModal(!showModal) } }
                        style={Estilo.TouchableFlotante2}>
                        <Image
                            source={require("./../assets/Question.png")}
                            style={Estilo.BotonFlotante2}/>
                    
                    </TouchableOpacity>
                    </View>
            </SafeAreaView>
        );
    }
    
    return (
        <NativeBaseProvider>
            <Box flex = {10} style = {Estilo.Contenedor}>
                <FlatList
                    data={Datos}
                    renderItem={Topicos}
                    style = {{height: 100}}/>
                </Box>
                <Pressable onPress = {()=> { navigation.navigate("newPost")}}>
                    
                    </Pressable>
                <HowTo/>
				<BotonFlotante/>
                <BotonFlotante2/>
			</NativeBaseProvider>

    );
}

//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#0df',
        alignItems: 'center',
        justifyContent: 'center',
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
    Caratula: {
        width: '99%',
        alignItems: 'center',
        alignContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 2,
        margin: 2
        },
    Caratula2: {
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 0,
        margin: 15
        },
    Caratula3: {
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 0,
        margin: 15
        },
    Lista: {
        width: '100%'
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
        height: 40,
        textAlign: 'center',
        borderRadius: 10
        },
    BotonEstilo: {
        backgroundColor: '#000',
        padding: 8,
        margin: 4,
        color: 'black',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 15,
        height: 45,
        width: 70,
        },
    TouchableFlotante: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
      },
    BotonFlotante: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        //backgroundColor:'black'
      },
      TouchableFlotante2: {
          position: 'absolute',
          width: 65,
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
          left: 15,
          bottom: 15,
        },
      BotonFlotante2: {
          resizeMode: 'contain',
          width: 65,
          height: 65,
          //backgroundColor:'black'
        }

    });


export default Community;