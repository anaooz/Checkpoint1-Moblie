import { useEffect, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cidade, setCidade] = useState('')
  const [cidadeEscolhida, setCidadeEscolhida] = useState(null)

  useEffect(() => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=60435cc0cee30e79981d75a17851e50f`
  getCidades(url)
}, [cidade])

  const getCidades = (url) => {
    axios.get(url)
    .then(response => {
      const cidade = {
        nome: response.data.name,
        tempo: response.data.weather[0].main,
        temperatura: response.data.main.temp
      }
      setCidadeEscolhida(cidade)
    })
    .catch((error) => {
      //Alert.alert("Não foi possível encontrar a cidade", error.message)
      //O alerta ativa no meio da digitação
    })
  }


  return (
    <View style={styles.container}>
      {cidadeEscolhida && (
        <ImageBackground source={{uri: `./img/${cidadeEscolhida.tempo}.jpg`}}>
          <Text style={styles.nomeCidade}>{cidadeEscolhida.nome}</Text>
          <Text style={styles.tempoCidade}>{cidadeEscolhida.tempo}</Text>
          <Text style={styles.temperaturaCidade}>{Math.round(cidadeEscolhida.temperatura/10)}º</Text>
        </ImageBackground>
      )}
      <TextInput
      placeholder='Search any city'
      placeholderTextColor = "#fff" //https://stackoverflow.com/questions/44739331/change-react-native-textinputs-placeholder-color
      onChangeText={texto => setCidade(texto)}
      value={cidade}
      style={styles.inputText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  nomeCidade: {
    fontSize: 50,
    textAlign: 'center'
  },

  tempoCidade: {
    fontSize: 25,
    textAlign: 'center'
  },

  temperaturaCidade: {
    fontSize: 40,
    textAlign: 'center'
  },
  
  inputText: {
    backgroundColor: '#666666',
    color: '#fff',
    placeholderTextColor: "#fff",
    fontSize: 20,
    marginTop: 10,
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 10
  }
});