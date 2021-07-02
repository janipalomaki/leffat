import React, { useEffect, useState, useCallback } from 'react';

import { StyleSheet, ScrollView } from 'react-native';

// Youtube iFrame
import YoutubePlayer from "react-native-youtube-iframe";

// React Native Paper
import { ActivityIndicator } from 'react-native-paper';

export default function Trailer ({ route }) {

    const {id} = route.params;

    // Elokuvan tiedot
    const [data, setData] = useState({
        tiedot : [],
        virhe : null,
        tiedotHaettu: false
    });

    const haeVideot = async () => {

        try {
            const api_key = "";
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

// Youtube videon toistotila
const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      
    }
  }, []);


useEffect(() => {
    haeVideot();
}, []);


// Luodaan lista trailereista
const trailerit = [];
for (const property in data.tiedot) {
    trailerit.push({
        traileri : data.tiedot[property]
    })
}
const traileritiedot = [];
trailerit.forEach((traileri, idx) => {
    traileritiedot.push({
        key : traileri.traileri.key
 });

})

  return(
    <ScrollView>
        {(data.tiedotHaettu)
          ? traileritiedot.map((traileri, idx) => {

            if (idx == 0){ // Ladataan vain listan ensimmäinen traileri
              return (
                <YoutubePlayer
                  key={idx}
                  height={300}
                  play={playing}
                  videoId={traileri.key}
                  onChangeState={onStateChange}
                />
              )
            }
          })
          :<ActivityIndicator 
          style={styles.lataus}
          size="large"
          animating={true} 
            />
        }
    </ScrollView>
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
  
