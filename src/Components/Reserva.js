import React from 'react';
import {
    ScrollView, StyleSheet, Text, TouchableHighlight, View,TouchableOpacity
} from 'react-native';

const Reserva = ({item, eliminarPaciente}) => {

    const dialogoEliminar = id => {
    console.log('Deletando', id);
    eliminarPaciente(id);
}

return (
    <ScrollView>
     
    <View style={styles.reservar}>
    <View>
    <Text style={styles.label}> Paciente: </Text>
    <Text style={styles.texto}> {item.paciente} </Text>
    </View>
<View>
    <Text style={styles.label}> Idade: </Text>
    <Text style={styles.texto}> {item.idade} </Text>
</View>
 <View>
    <Text style={styles.label}> Sintomas: </Text>
    <Text style={styles.texto}> {item.sintomas} </Text>
    </View>
    <View>

<TouchableHighlight onPress={ () => dialogoEliminar(item.id) } style={styles.btnEliminar}>
    <Text style={styles.textoEliminar}> Excluir &times; </Text>
</TouchableHighlight>
    </View>
    </View>
</ScrollView>
)
}

const styles = StyleSheet.create({
reservar: {
backgroundColor: '#FFF',
borderBottomColor: '#e1e1e1',
borderStyle: 'solid',
borderBottomWidth: 1,
paddingVertical: 10,
paddingHorizontal: 10
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 10
},
texto: {
fontSize: 18,
},
btnEliminar: {
padding: 10,
backgroundColor: '#f00',
marginVertical: 10
},
textoEliminar: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Reserva;