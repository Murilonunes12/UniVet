import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Alert, ScrollView } from 'react-native';
import { Button} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import nextId from "react-id-generator";
import { TextInputMask } from 'react-native-masked-text'

const Formulario = ({reservas, setReservas, guardarMostrarForm, guardarReservasStorage}) => {
const [paciente, guardarPaciente] = useState('');
const [raca, guardarRaca] = useState('');
const [idade, guardaridade] = useState('');
const [Telefone, guardarTelefone] = useState('');
const [fecha, guardarFecha] = useState('');
const [hora, guardarHora] = useState('');
const [sintomas, guardarSintomas] = useState('');
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


const Example = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    };
    return (
    <View>
    <Button title="Show Date Picker" onPress={showDatePicker} />
    <DateTimePickerModal
    isVisible={isDatePickerVisible}
    mode="date"
    onConfirm={handleConfirm}
    onCancel={hideDatePicker}
    />
    </View>
    );
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };
    const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
    guardarFecha(date.toLocaleDateString('pt-br', opciones));
    hideDatePicker();
    };

    const showTimePicker = () => {
    setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
    setTimePickerVisibility(false);
    };
    const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
    guardarHora(hora.toLocaleString('pt-BR', opciones));
    hideTimePicker();
    };
    const crearNuevaReserva = () => {

    if(paciente.trim() === '' ||
    raca.trim()=== '' ||
    idade.trim() === '' ||
    Telefone.trim() === '' ||
    fecha.trim() === '' ||
    hora.trim() === '' ||
    sintomas.trim() === '')
{
mostrarAlerta();
return;
}
const reserva = {
    paciente,
    raca,
    idade,
    Telefone,
    fecha,
    hora,
    sintomas
};

reserva.id = nextId();


const reservasNueva = [...reservas, reserva];
setReservas(reservasNueva);

guardarReservasStorage(JSON.stringify(reservasNueva));

guardarMostrarForm(false);

guardarSintomas('');
guardaridade('');
guardarRaca (''),
guardarPaciente('');
guardarHora('');
guardarFecha('');
guardarTelefone('');
}

const mostrarAlerta = () => {
Alert.alert( 
'Error', 
'Todos os campos são obrigatorios', 
[{
text: 'OK' }]
)
}
return (
<>
<ScrollView style={styles.formulario}>
<View>
<Text style={styles.label}>Paciente:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarPaciente(texto) }
/>
</View>
<View>
    <Text style={styles.label}>Raça</Text>
    <TextInput
    style={styles.input}
    onChangeText={texto => guardarRaca(texto)}
    />
</View>
<View>

<Text style={styles.label}>Idade:</Text>
<TextInput style={styles.input}
onChangeText = { texto => guardaridade(texto)
}
keyboardType='numeric' 
/>
</View>
<View>
<Text style={styles.label}>Telefone:</Text>
<TextInputMask
     style={styles.input}
     type={'cel-phone'}
     options={{
     maskType: 'BRL',
     withDDD: true,
     dddMask: '(99) '
     }}
                
     onChangeText = {
     (text) => guardarTelefone(text)
     }
/>
</View>
<View>
<Text style={styles.label}>Data para possível consulta:</Text>
<Button title="Selecionar Data" onPress={showDatePicker} />
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
minDate={new Date(2020, 1, 1)}
maxDate={new Date(2020, 1, 29)}
onConfirm={confirmarFecha}
onCancel={hideDatePicker}
locale = 'pt-BR'
headerTextIOS="Escolha a data"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{fecha}</Text>
</View>
<View>
<Text style={styles.label}>Escolha a Hora:</Text>
<Button title="Selecionar Hora" onPress={showTimePicker} />
<DateTimePickerModal
    isVisible={isTimePickerVisible}
    mode="time"
    onConfirm={confirmarHora}
    onCancel={hideTimePicker}
    locale = 'pt-BR'
    headerTextIOS = "Escolha a Hora"
    cancelTextIOS="Cancelar"
    confirmTextIOS="Confirmar"
    />
<Text>{hora}</Text>
</View>

 <View>
 <Text style={styles.label}>Descreve os Sintomas:</Text>
<TextInput
    multiline
    style={styles.input}
    onChangeText={ texto => guardarSintomas(texto) }
    />
</View>

  <View>
    <TouchableHighlight onPress={ () => crearNuevaReserva() } style={styles.btnSubmit}>
    <Text style={styles.textoSubmit}>Criar Novo Agendamento</Text>
</TouchableHighlight>
</View>
</ScrollView>

</>

);
}
const styles = StyleSheet.create({
formulario: {
backgroundColor: '#FFF',
paddingHorizontal: 20,
paddingVertical: 10,
flex: 1
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 6},
input: {
marginTop: 2,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
},
btnSubmit: {
padding: 10,
backgroundColor: '#143694',
marginVertical: 10

},
textoSubmit: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Formulario;
