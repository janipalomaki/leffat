import React, { useEffect, useState, useCallback, useRef } from 'react';

import { StyleSheet, View, Text, Button, Alert } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Portal, Dialog, Paragraph, Card, Title, FAB } from 'react-native-paper';

// Youtube iFrame
import YoutubePlayer from "react-native-youtube-iframe";

export default function Trailer ({ route }) {

    const {id} = route.params;

    // Tietoja haetaan dialogi
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    // Elokuvan tiedot
    const [data, setData] = useState({
        tiedot : [],
        virhe : null,
        tiedotHaettu: false
    });

    const [trailerKey, setTrailerKey] = useState("");

    const haeVideot = async () => {

        try {

            const api_key = "be89a5c9f2b435fe0ba9065707ea930a";
            const base_url = "https://api.themoviedb.org/3/movie/" + id + "/videos";
            const url = base_url + '?api_key='+ api_key;
            const response = await fetch(url);
            const data = await response.json();

            setData({
                ...data,
                tiedot : data.results,
                tiedotHaettu : true
            });



        } catch (e) {

            setData({
                ...data,
                virhe : `Palvelimeen ei saatu yhteyttä ${e.message}`,
                tiedotHaettu : true
            });
        }
    }

const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


    // Youtube API
    const youtube_api_key = "AIzaSyCxhpoExrDqboYr0Ek6xgDozWjdldbDun4";


    // Testaa Expo video toimiiko??


    
    useEffect(() => {
        haeVideot();
    }, []);
    
// Pitää ratkaista, että lataa varmasti tiedot ennen kuin asettaa key:n trailerille!
    let key = "";
    (data.tiedotHaettu)
    ? key = JSON.stringify(data.tiedot[0].key)
    : key = "odM92ap8_c0"


    return(
    <View>
    {(data.tiedotHaettu)
      ?<YoutubePlayer
        height={300}
        play={playing}
        videoId={"odM92ap8_c0"}
        onChangeState={onStateChange}
      />
      //<Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      
      :<Text>Videota ladataan, odota hetki...</Text>
    }
    </View>



        /*
        <View>

        {(data.tiedotHaettu)
        ?<Text>{JSON.stringify(data.tiedot[0].id)}</Text>
        : <Text>Haetaan videota, odota hetki...</Text>
        }

        </View>
        */
       
        /*
        <View>

           <YouTube
        apiKey={youtube_api_key}
        videoId={JSON.stringify(data.tiedot[0].id)} // The YouTube video ID
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => this.setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300 }}
        />
        </View>
        */

    )

}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      padding : 10
    },
  })
  
