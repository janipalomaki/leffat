import React from 'react';

import { StyleSheet, ScrollView } from 'react-native';

// React Native Paper
import { Provider as PaperProvider, Card, Title, Text } from 'react-native-paper';


export default function Categories ( { navigation }) {

    return(
        
        <ScrollView>
            <PaperProvider>
                <Card
                style={styles.kortti}
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "now_playing" })}
                >
                    <Card.Content>
                        <Title
                        style={styles.otsikko}
                        >Now playing</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500' + '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg' }} />
                    
                </Card>

                <Card
                style={styles.kortti}
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "popular" })}
                >
                    <Card.Content>
                        <Title
                        style={styles.otsikko}
                        >Popular</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500' + '/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg' }} />
                </Card>

                <Card
                style={styles.kortti}
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "top_rated" })}
                >
                    <Card.Content>
                        <Title
                        style={styles.otsikko}
                        >Top rated</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500' + '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg' }} />
                </Card>

                <Card
                style={styles.kortti}
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "upcoming" })}
                >
                    <Card.Content>
                        <Title
                        style={styles.otsikko}
                        >Upcoming</Title>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500' + '/lPsD10PP4rgUGiGR4CCXA6iY0QQ.jpg' }} />
                </Card>
                <Text style={styles.attribute}>Copyright 2021 Jani Palomäki. Film data from TMDb</Text>
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
        fontSize : 24,
        marginTop : -15,
        padding : 3
    },
    attribute : {
        textAlign : 'center',
        fontSize : 12,

    }
  });
  

  