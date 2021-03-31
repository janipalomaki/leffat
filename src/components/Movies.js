import React, { useEffect, useState } from 'react';

import { ScrollView, Text } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Card, Title, Paragraph, Portal, Dialog } from 'react-native-paper';


export default function Movies ({ route, navigation }) {

    const {kategoria} = route.params;

    // Tietoja haetaan dialogi
    const [visible, setVisible] = React.useState(false);
    const hideDialog = () => setVisible(false);


    // Elokuvadata
    const [data, setData] = useState({
        elokuvat : [],
        virhe : null,
        tiedotHaettu: false
    });

    const haeElokuvat = async () => {

        try {

            const api_key = "be89a5c9f2b435fe0ba9065707ea930a";
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
                    //console.log(elokuvatieto);
                return (
                        <Card
                        onPress={ () => navigation.navigate("Details",
                        { // Viedään tiedot --> "Elokuvantiedot"
                            id : elokuvatieto.id
                        }
                        )}
                        key={idx}
                        >
                            <Card.Content>
                                <Title>{elokuvatieto.title}</Title>
                                <Paragraph>{elokuvatieto.genre_ids}</Paragraph>
                            </Card.Content>
                        </Card>
                    )    
                })
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
