import React, { useEffect, useState } from 'react';

import { ScrollView, Text } from 'react-native';

// React Native Paper
import { Dialog, Provider as PaperProvider, Portal, Paragraph, Card, Title } from 'react-native-paper';


export default function Categories ({ navigation }) {

    return(
        
        <ScrollView>
            <PaperProvider>
                <Card
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "now_playing" })}
                >
                    <Card.Content>
                        <Title>Now playing</Title>
                    </Card.Content>
                </Card>
                <Card
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "popular" })}
                >
                    <Card.Content>
                        <Title>Popular</Title>
                    </Card.Content>
                </Card>
                <Card
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "top_rated" })}
                >
                    <Card.Content>
                        <Title>Top rated</Title>
                    </Card.Content>
                </Card>
                <Card
                onPress={ () => navigation.navigate("Movies", 
                { kategoria : "upcoming" })}
                >
                    <Card.Content>
                        <Title>Upcoming</Title>
                    </Card.Content>
                </Card>
            </PaperProvider>
        </ScrollView>

    )

}