import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Paragraph, Card, Title, FAB, ActivityIndicator, Subheading } from 'react-native-paper';


export default function Details ({ route, navigation }) {

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

    const haeElokuvat = async () => {

        try {

            const api_key = "be89a5c9f2b435fe0ba9065707ea930a";
            const base_url = "https://api.themoviedb.org/3/movie/" + id;
            const url = base_url + '?api_key='+ api_key;
            const response = await fetch(url);
            const data = await response.json();

            setData({
                ...data,
                tiedot : data,
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
    }, []);

    return(

        <ScrollView>
            
            {(data.tiedotHaettu)
            ?
            <PaperProvider>
                <Card>
                    <Card.Content>
                        <Title>{data.tiedot.original_title}</Title>
                        <Subheading>"{data.tiedot.tagline}"</Subheading>
                    </Card.Content>
                    <Card.Content>
                        <Paragraph>{data.tiedot.overview}</Paragraph>
                    </Card.Content>
                    <Card.Cover 
                    style={styles.kuva}
                    source={{ uri: "https://image.tmdb.org/t/p/original/" + data.tiedot.poster_path }} />
                    <FAB
                    style={styles.fab}
                    small
                    icon="youtube"
                    onPress={ () => navigation.navigate("Trailer", 
                        { id : id })}
                    />
                </Card>
                <Card>
                    <Card.Content>
                        <Subheading
                        style={styles.arvio}
                        >Katsojien arvio: {data.tiedot.vote_average} / 10</Subheading>
                        <Paragraph>({data.tiedot.vote_count} arvostelua)</Paragraph>
                    </Card.Content>
                </Card>
            </PaperProvider>
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
    kuva: {
        marginTop : 15
    },
    arvio: {
        fontWeight : "bold"
    }
  })

