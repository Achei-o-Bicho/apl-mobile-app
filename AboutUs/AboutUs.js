import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MainView, Text, Paw } from './Style';

export default function AboutUs({ navigation }) {
    return (
        <MainView>
            <View>
                <Text>
                    É com grande preocupação que compartilhamos informações sobre o aumento significativo do número de animais de estimação em situação de desamparo no Brasil, especialmente durante os anos de 2018 e 2020. De acordo com o Instituto Pet Brasil (IPB), os dados coletados durante um levantamento em 2018 revelaram que aproximadamente 3,9 milhões de animais estavam nessas condições. No entanto, esse número sofreu um alarmante crescimento de 126% no início da pandemia, em 2020.
                </Text>
                <Text>
                    Percebendo a urgência de lidar com essa questão, conduzimos pesquisas para encontrar maneiras de identificar e ajudar esses animais vulneráveis. Descobrimos que uma das soluções promissoras é a análise das ranhuras únicas presentes nos focinhos dos animais, semelhante às impressões digitais humanas. Este conceito foi uma das descobertas da pesquisa mais recente chamada "Animais em Condição de Vulnerabilidade" (ACV), conduzida a cada dois anos pelo Instituto Pet Brasil.
                </Text>
                <Text>
                    Para assegurar um processo de identificação confiável e altamente eficaz, estamos elaborando uma abordagem que compreende a captura e análise de fotografias em perfil dos animais. Essas imagens dos focinhos passarão por um processo de otimização para refinamento das análises, incorporando também o uso de Inteligência Artificial (IA) para potencializar o processo de identificação.
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Paw
                    source={require('../assets/paw.png')}
                />
            </TouchableOpacity>
        </MainView>
    );
};