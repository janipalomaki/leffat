import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Card, Title } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';

export default function Movies ({ route, navigation }) {

    const {kategoria} = route.params;


    // Elokuvadata
    const [data, setData] = useState({
        elokuvat : [],
        virhe : null,
        tiedotHaettu: false
    });

    const haeElokuvat = async () => {

        try {

            const api_key = "";
            const base_url = "https://api.themoviedb.org/3/movie/" + kategoria;
            const url = base_url + '?api_key='+ api_key + "&language=en-US";
            const response = await fetch(url);
            const data = await response.json();

            setData({
                ...data,
                elokuvat : data.results,
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

    useEffect(() => {
        haeElokuvat();
    }, [kategoria]);


    //--- Luodaan lista elokuvista ---
    const elokuvat = [];
    for (const property in data.elokuvat) {
        elokuvat.push({
            elokuva : data.elokuvat[property]
        })
    }

    const elokuvatiedot = [];
    elokuvat.forEach((elokuva, idx) => {
        elokuvatiedot.push({
            title : elokuva.elokuva.title,
            genre_ids : elokuva.elokuva.genre_ids,
            poster_path : elokuva.elokuva.poster_path,
            id : elokuva.elokuva.id
        });

    })
    //-----


    return(
        <ScrollView>
            <PaperProvider>
                {(data.tiedotHaettu)
                ? elokuvatiedot.map((elokuvatieto, idx) => {
                return (
                        <Card
                        style={styles.kortti}
                        onPress={ () => navigation.navigate("Details",
                        { // Viedään tiedot --> "Elokuvantiedot"
                            id : elokuvatieto.id
                        }
                        )}
                        key={idx}
                        >
                            <Card.Content>
                                <Title
                                style={styles.otsikko}
                                >{elokuvatieto.title}</Title>
                            </Card.Content>
                            <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500' + elokuvatieto.poster_path }} />
                        </Card>
                    )    
                })
                :<ActivityIndicator 
                style={styles.lataus}
                size="large"
                animating={true} 
                 />
            }
            </PaperProvider>
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    kortti : {
        padding : 3,
        margin : 5,
        marginTop : 10,
    },
    otsikko : {
        textAlign : 'center',
        fontSize : 18,
        marginTop : -15,
        padding : 3
    },
    lataus : {
        marginTop : 30
    }
  });
  
