import { useEffect, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { tempo_images } from './components/imageHandler';

export default function App() {
  const [cidade, setCidade] = useState('')
  const [cidadeEscolhida, setCidadeEscolhida] = useState('')

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

  let imageSource = null 
  //https://stackoverflow.com/questions/30854232/react-native-image-require-module-using-dynamic-names/45418504#45418504

  if(cidadeEscolhida.tempo == "Clouds"){
    imageSource = tempo_images.Clouds.uri
  } else if(cidadeEscolhida.tempo == "Rain"){
    imageSource = tempo_images.Rain.uri
  } else if(cidadeEscolhida.tempo == "Clear"){
    imageSource = tempo_images.Clear.uri
  }

  return (
    <View style={styles.container}>
      {cidadeEscolhida && (
        <ImageBackground source={imageSource} style={styles.image}>
          <Text style={styles.nomeCidade}>{cidadeEscolhida.nome}</Text>
          <Text style={styles.tempoCidade}>{cidadeEscolhida.tempo}</Text>
          <Text style={styles.temperaturaCidade}>{Math.round(cidadeEscolhida.temperatura/10)}º</Text>
          <TextInput
          placeholder='Search any city'
          placeholderTextColor = "#fff" //https://stackoverflow.com/questions/44739331/change-react-native-textinputs-placeholder-color
          onChangeText={texto => setCidade(texto)}
          value={cidade}
          style={styles.inputText}/>
        </ImageBackground>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  nomeCidade: {
    fontSize: 60,
    textAlign: 'center'
  },

  tempoCidade: {
    fontSize: 35,
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
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});