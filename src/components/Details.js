import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView, Text } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Portal, Dialog, Paragraph, Card, Title, FAB } from 'react-native-paper';


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
            const url = base_url + '?api_key='+ api_key + "&append_to_response=videos";
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
    }, [id]);

 
// console.log(data.tiedot.poster_path);


    return(

        <ScrollView>
            <PaperProvider>

                
                {(data.tiedotHaettu)
                ?
                <Card>
                    <Card.Content>
                        <Title>{data.tiedot.original_title}</Title>
                        <Paragraph>{data.tiedot.overview}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: "https://image.tmdb.org/t/p/original/" + data.tiedot.poster_path }} />

                    <FAB
                    style={styles.fab}
                    small
                    icon="youtube"
                    onPress={() => console.log('Pressed')}
                    />
                </Card>

                :<Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Content>
                            <Paragraph>Tietoja haetaan, odota hetki...</Paragraph>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
                }
            </PaperProvider>
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
  
