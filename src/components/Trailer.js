import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView, Text } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Portal, Dialog, Paragraph, Card, Title, FAB } from 'react-native-paper';


export default function Details ({ route }) {

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

    useEffect(() => {
        haeVideot();
    }, []);



    return(

        <ScrollView>
            <PaperProvider>

                
                {(data.tiedotHaettu)
                ?
                <Card>
                    <Card.Content>
                        <Title>Leffan id: {id}</Title>
                        <Paragraph>{JSON.stringify(data.tiedot)}</Paragraph>
                    </Card.Content>
                
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
  
