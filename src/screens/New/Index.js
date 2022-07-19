import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Reserva from '../../Components/Reserva';
import Formulario from '../../Components/Formulario';



const Agenda = () => {
  const [reservas, setReservas] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);
  useEffect(() => {
  const obtenerReservasStorage = async () => {
    try {
    const reservasStorage = await AsyncStorage.getItem('reservas');
    if(reservasStorage) {
  setReservas(JSON.parse(reservasStorage))
  }
  } catch (error) {
  console.log(error);
  }
  }
  obtenerReservasStorage();
}, []);

    const eliminarPaciente = id => {
    const reservasFiltradas = reservas.filter( reserva => reserva.id !== id );
      setReservas( reservasFiltradas );
      guardarReservasStorage(JSON.stringify(reservasFiltradas));
}

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
}

  const FecharTeclado = () => {
  Keyboard.dismiss();
}
  const guardarReservasStorage = async (reservasJSON) => {
  try {
  await AsyncStorage.setItem('reservas', reservasJSON);
  } catch (error) {
  console.log(error);
}
}
return (
  
  <TouchableWithoutFeedback TouchableWithoutFeedback onPress = {
    () => FecharTeclado()
  } >
  <View style={styles.contenedor}>
      <Text style={styles.titulo}></Text>
  <View>
  <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
    <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Agendamento' : 'Criar Novo Agendamento'} </Text>
  </TouchableHighlight>
    </View>
  <View style={styles.contenido}>
    { mostrarform ? (
    <>
      <Text style={styles.titulo}>Formulário de Agendamento</Text>
  <Formulario
    reservas={reservas}
    setReservas={setReservas}
    guardarMostrarForm={guardarMostrarForm}
    guardarReservasStorage={guardarReservasStorage}
  />
  </>
) : (
  <>
  <Text style={styles.titulo}>{reservas.length > 0 ? 'Agendamentos Registrados' : 'Não existem Agendamentos realizados'} </Text>
  <FlatList
  style={styles.listado}
  data={reservas}
  renderItem={ ({item}) => <Reserva item={item} eliminarPaciente={eliminarPaciente} /> }
  keyExtractor={ reserva => reserva.id}
  />
</>
) }
</View>
</View>
</TouchableWithoutFeedback>
);
};
const styles = StyleSheet.create({
contenedor: {
backgroundColor: '#fff',
flex: 1
},
titulo: {
color: '#000',

marginTop: 25,
marginBottom: 10,
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center'
},
contenido: {
flex: 1,
marginHorizontal: '2.5%',
},
listado: {
flex: 1,
},
btnMostrarForm: {
width:123,
height:60,  
padding: 10,
marginLeft:250,
backgroundColor:'#143694',
marginVertical: 10,
alignItems:'center',
borderRadius:200
},

textoMostrarForm: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}

});

export default Agenda;
