import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Alert, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Input, Button, NativeBaseProvider, Box, Divider } from "native-base";
import { addDoc, doc, setDoc, getDocs, collection, limit, query, where } from 'firebase/firestore';
import fb from '../Firebase/Conexion'

const ShowPost = ({ route, navigation }) => {

    const { idPost, Autor, Descripcion, Tema } = route.params;

    const [Usr, setUsr] = useState("Carlos")
    const BotonFlotante = () => {
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            setShowModal(!showModal)
                            console.log(showModal)
                        }}
                        style={Estilo.TouchableFlotante}>
                        <Image
                            source={require("./../assets/Chat.png")}
                            style={Estilo.BotonFlotante} />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        );
    }

    const [showModalProceder, setShowModalProceder] = useState(false)

    const changeShowModalProceder = () => {
        setShowModalProceder(!showModalProceder)
        console.log("Proceder: ", showModalProceder)
    }

    const ProcederModal = () => {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModalProceder}
                onRequestClose={() => {
                    alert("Hasta luego");
                    setShowModalProceder(!showModalProceder);
                }}
            >
                <View style={Estilo.ModalProc}>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>Antes de continuar...</Text>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>¿Realmente desea publicar este post?</Text>
                    <Stack space={2} direction='coulumn'>
                        <Button style={{ width: 100 }} onPress={Publicar}>Continuar</Button>
                        <Button style={{ width: 100 }} onPress={changeShowModalProceder}>Cancelar</Button>
                    </Stack>
                </View>
            </Modal>
        );
    }

    const FechaFinal = "".concat(new Date().getDate(), "/", new Date().getMonth() + 1, "/", new Date().getFullYear())


    const Publicar = async () => {
        if (Comentario != "") {
            const docRef = await addDoc(collection(fb.db, "Comentarios"), {
                Autor: Usr,
                Tema: Tema,
                Comentario: Comentario,
                Fecha: FechaFinal
            });

            if (docRef.id != "") {
                alert("Registro exitoso");
                setShowModalProceder(!showModalProceder)
                //setShowModal(!showModal)
                BuscarInfo();
                Lista();
            }
            else
                alert("Hubo un error al registrar");
        }
        else {
            alert("No te has expresado :c")
            setShowModalProceder(!showModalProceder)
        }

    }

    useEffect(() => {
        BuscarInfo();
        console.log("Hecho")
    }, []);

    const [Comentarios, setComentarios] = useState({
        id: "",
        Comentario: "",
        Autor: "",
        Foro: ""
    })

    const [Comentario, setComentario] = useState("")

    const handleChange = (e) => {
        setComentario(e.target.value);
        console.log("Text: ", e.target.value, " Com: ", Comentario)
    }

    const handleComentarios = (e) => {
        setComentarios(e);
    }


    const BuscarInfo = async () => {
        console.log("Inicia")
        //Referencia a la BD en su tabla topicos
        const dbRef = collection(fb.db, "Comentarios");

        const Fila = [];
        const Busqueda = query(dbRef, where("Tema", "==", Tema), limit(10));
        const querySnapshot = await getDocs(Busqueda);

        querySnapshot.forEach((doc) => {
            const Id = doc.id;
            const { Autor, Tema, Comentario, Fecha } = doc.data();
            Fila.push({
                Id,
                Autor,
                Tema,
                Comentario,
                Fecha
            });
        });
        handleComentarios(Fila);
        console.log("Fila:\n", Fila);

        console.log("Fin");
        return Fila;
    }

    //Elementos para modal de continar

    const ComponenteComentarios = ({ item }) => {
        return (
            <Stack style={{ padding: 4, alignItems: 'center', borderWidth: 2, borderColor: 'black', borderRadius: 20 }} direction="row" space={2} style={Estilo.Caratula}>

                <Stack style={{ alignItems: 'center', borderWidth: 2, borderColor: 'black' }} direction="column" space={2}>

                    <Stack style={{ alignItems: 'center', }} direction="column" space={2}>
                        <Image alt="Foto" style={{ borderColor: 'black', borderWidth: 2, borderRadius: 60, width: 60, height: 60 }}></Image>
                        <Input value={item.Comentario} variant="rounded" mx="3" disabled /></Stack>

                </Stack>
            </Stack>
        );
    }

    const Lista = () => {
        return(
        <FlatList
            data={Comentarios}
            renderItem={ComponenteComentarios}
        />);
    }

    const CambioHecho = () => {
        BuscarInfo();
        Lista();
    }

    const [showModal, setShowModal] = useState(false)

    return (
        <NativeBaseProvider>
            <Box flex={10} style={Estilo.Contenedor}>
                <Box flex={10} style={Estilo.Marco}>
                    <Text style={Estilo.Titulo}>{Tema}</Text>
                    <Divider style={Estilo.Divider} />
                    <Text style={Estilo.Texto}>{Descripcion}</Text>
                    <Divider style={Estilo.Divider} />
                    <Text style={Estilo.Titulo}>Creado por {Autor}</Text>
                    <Image alt="Foto" style={{ borderColor: 'black', borderWidth: 2, borderRadius: 60, width: 60, height: 60 }}></Image>

                </Box>
                <Box>
                    <Button onPress={() => {
                        navigation.navigate("Comm")
                    }}>
                        Regresar
                    </Button>

                </Box>
                <BotonFlotante />
            </Box>

            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    alert("Hasta la proxima c:");
                    setShowModal(!showModal);
                }}>
                <View style={Estilo.ViewComent}>

                    <View style={Estilo.EstiloModal}>
                        <Lista />
                    </View>
                    <Divider />

                    <Stack direction="row" space={2}>

                        <Input value={Comentario} onChange={(e) => handleChange(e)} variant="rounded" mx="3" placeholder="Comparte tus ideas c:" />

                        <Button onPress={() => changeShowModalProceder(!showModalProceder)}>Enviar</Button>

                    </Stack>

                    <Divider />
                    <View>
                        <Button style={Estilo.BotonCerrarModal} onPress={() => {
                            setShowModal(!showModal);
                            console.log("Cerrar");
                        }}>Cerrar</Button>
                    </View>
                </View>
            </Modal>

            <ProcederModal />
        </NativeBaseProvider>


    );
}


//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 2,
        width: '100%',
        height: '100%',
    },
    ModalProc: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        padding: 22,
        margin: 5,
        borderWidth: 1,
        borderRadius: 50
    },
    ViewComent: {
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
        left: 160,
        bottom: 10,
    },
    BotonCerrarModal: {
        alignItems: 'center',
        height: 55,
        width: '80%',
        margin: 20,
        padding: 20,
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
        padding: 2,
        margin: 2
    },
    InputCommentario: {
        alignItems: 'center',
        padding: 2,
        margin: 2
    },
});


export default ShowPost;