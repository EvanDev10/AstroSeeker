import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Alert, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Input, Button, NativeBaseProvider, Box, Divider } from "native-base";
import { deleteDoc, addDoc, doc, updateDoc, setDoc, getDocs, orderBy, collection, limit, query, where } from 'firebase/firestore';
import fb from '../Firebase/Conexion'

const ManagePost = ({ route, navigation }) => {

    const [Usr, setUsr] = useState("Javys")

    const FechaDeHoy = () => {

        const Dia = new Date().getDate();
        const Mes = new Date().getMonth() + 1;
        const Ano = new Date().getFullYear();

        const Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

        return "".concat(Dia, "-", Meses[Mes - 1], "-", Ano);

    }


    useEffect(() => {
        BuscarInfo();
    }, [Bus]);

    useEffect(() => {
        BuscarInfo();
        Lista
    }, [route.params]);

    //Listado de 10 post 
    const [Temas, setTemas] = useState({
        Id: "",
        Autor: "",
        Tema: "",
        Descripcion: "",
        Fecha: ""
    })

    const [Bus, setBus] = useState("")

    const handleBus = (e) => { setBus(e.target.value); console.log("Bus: ", e.target.value) }

    const handleTema = (e) => {
        setTemas(e);
        console.log(Temas)
    }

    const BuscarInfo = async () => {
        console.log("Inicia")
        //Referencia a la BD en su tabla topicos
        const dbRef = collection(fb.db, "Topicos");

        const Fila = [];

        if (Bus != "") {
            const Busqueda = query(dbRef, where("Autor", "==", Usr), startAt(Bus));

            const querySnapshot = await getDocs(Busqueda);

            querySnapshot.forEach((doc) => {
                const Id = doc.id;
                const { Autor, Tema, Descripcion, Fecha } = doc.data();
                Fila.push({
                    Id,
                    Autor,
                    Tema,
                    Descripcion,
                    Fecha
                });
            });
            handleTema(Fila);
            console.log("Temas", Temas);
        }
        else {
            const Busqueda = query(dbRef, where("Autor", "==", Usr));
            const querySnapshot = await getDocs(Busqueda);

            querySnapshot.forEach((doc) => {
                const Id = doc.id;
                const { Autor, Tema, Descripcion, Fecha } = doc.data();
                Fila.push({
                    Id,
                    Autor,
                    Tema,
                    Descripcion,
                    Fecha
                });
            });
            handleTema(Fila);
            console.log("Fila:\n", Fila);
        }
        console.log("Fin");
        return Fila;
    }


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
                        alert("Hasta la proxima c:");
                        setShowModal(!showModal);
                    }}
                >
                    <View style={{ alignItems: 'center', padding: 22, margin: 5 }}>
                        <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>Bienvenido</Text>
                        <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>AQUI SE MUESTRAN LAS DIFERENTES INSTRUCCIONES PARA MANEJAR LA APLICACION</Text>
                        <Stack space={3} direction='row'>
                            <Button style={{ width: 100 }}>{"<-"}</Button>
                            <Button style={{ width: 100 }} onPress={() => setShowModal(!showModal)}>X</Button>
                            <Button style={{ width: 100 }}>{"->"}</Button>
                        </Stack>
                    </View>
                </Modal>
            </View>
        );
    }
    //Metodo para actualizar
    const Erease = async (key, topic) => {
        console.log(key, "- ", topic)
        //Borra El Post
        await deleteDoc(doc(fb.db, "Topicos", key));
        //Sus comentarios
        await deleteDoc(doc(fb.db, "Comentarios", topic));
    }
    //Metodo para actualizar
    const Update = async (key, cont) => {
        const RegistroSeleccionado = doc(fb.db, "Topicos", key);
        await updateDoc(RegistroSeleccionado, {
            Comentario: cont
          });
    }

    //Componente del foro
    const Topicos = ({ item }) => {

        return (
            <View style={Estilo.Marco}>
                <Stack direcion="column" space={2}>
                    <View style={{ height: Estilo.Titulo.height, width: Estilo.Titulo.width }}>
                        <Text style={Estilo.Titulo}>{item.Tema}</Text>
                    </View>
                    <Stack direction="row" space={2} style={Estilo.Caratula2}>
                        <Stack style={{ width: 800 }} direction="row" space={2} style={Estilo.Caratula3}>
                            <Image alt="Foto" style={{ borderColor: 'black', borderWidth: 2, borderRadius: 40, width: 45, height: 45 }}></Image>
                            <Text style={Estilo.Texto}>{item.Autor}</Text>
                            <Button onPress={() => {
                                setshowModalUpd(!showModalUpd);
                            }}>Cambiar</Button>
                            <Button onPress={() => {
                                ProcederContinuar(item.Id, item.Tema, "d")
                            }}>Borrar</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </View>

        );
    }

    const [Adelante, setAdelante] = useState(false)

    const ProcederContinuar = (Id, Cont, Op) =>{

        setShowModal2(!showModal2);

        console.log("Ade: ", Adelante);


        

        

    }    

    const Lista = () => {
        return (
            <FlatList data={Temas} renderItem={Topicos} />
        );
    }

    const [showModal2, setShowModal2] = useState(false)

    const changeShowModal2 = () => setShowModal2(!showModal2)
    const changeAde = (e) =>{
        setAdelante(e);
        console.log(Adelante)
    }
    const ProcederModal = (Id, Top) => {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal2}
                onRequestClose={() => {
                    alert("Hasta luego");
                    setShowModal(!showModal2);
                }}
            >
                <View style={Estilo.ModalProc}>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>Antes de continuar...</Text>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>¿Realmente desea continuar?</Text>
                    <Stack space={2} direction='coulumn'>
                        <Button style={{ width: 100 }} onPress={
                            () => {
                                changeAde(true);
                                setShowModal2(!showModal2);
                            }
                        }>Continuar</Button>
                        <Button style={{ width: 100 }} onPress={ () => {
                            changeAde(false);
                            changeShowModal2;
                            }}>Cancelar</Button>
                    </Stack>
                </View>
            </Modal>
        );
    }

    const [Comentario, setComentario] = useState("")

    const [showModalUpd, setshowModalUpd] = useState("");

    return (
        <NativeBaseProvider>
            <Box flex={10} style={Estilo.Contenedor}>
                <Input value={Bus} onChange={handleBus} style={Estilo.InputBus} type="text" w="full" maxW="300px" py="0" InputRightElement=
                    {<Button size="xs" rounded="none" h="full" onPress={BuscarInfo}>Search
                    </Button>} placeholder="Tipea tu busqueda..." />
                <Divider />

                <Lista />
                <ProcederModal />
                <HowTo />

                {/*Modal De Update*/}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModalUpd}
                    onRequestClose={() => {
                        alert("Hasta la proxima c:");
                        setshowModalUpd(!showModalUpd);
                    }}>
                    <View style={Estilo.ViewComent}>

                        <View style={Estilo.EstiloModal}>
                            <Lista />
                        </View>
                        <Divider />

                        <Stack direction="row" space={2}>

                            <Input value={Comentario} onChange={(e) => setComentario(e)} variant="rounded" mx="3" placeholder="Comparte tus ideas c:" />

                            <Button onPress={() => setshowModalUpd(!showModalUpd)}>Actualizar</Button>

                        </Stack>

                        <Divider />
                        <View>
                            <Button style={Estilo.BotonCerrarModal} onPress={() => {
                                setshowModalUpd(!showModalUpd);
                                console.log("Cerrar");
                            }}>Cerrar</Button>
                        </View>
                    </View>
                </Modal>

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
    InputBus: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 3,
        padding: 5,
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
    },
    TouchableFlotante3: {
        position: 'absolute',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        left: "45%",
        bottom: "45%",
    },
    BotonFlotante3: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2
    }

});

export default ManagePost;