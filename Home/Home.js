import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';
import { SafeArea, TopView, LogoText, BottomView, ButtonCreateAccount, ButtonText, ButtonHaveAccount, HaveAccountButtonText, Button, ChevronUp, AboutText, BackgroundImage } from './Style';

export default function Home({ navigation }) {
    function chooseRandomImage() {
        const images = [
            require('../assets/Pets/cat.jpg'),
            require('../assets/Pets/dog.jpg')
        ];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    const backgroundImage = chooseRandomImage();
    const chevronAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(chevronAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, [])

    return (
        <>
            <SafeArea>
                <TopView>
                    <LogoText>Achei o Bicho</LogoText>
                </TopView>
                <BottomView>
                    <ButtonCreateAccount onPress={() => navigation.navigate('CreateAccount')}>
                        <ButtonText>Abrir sua conta</ButtonText>
                    </ButtonCreateAccount>
                    <ButtonHaveAccount>
                        <HaveAccountButtonText>Já tenho conta</HaveAccountButtonText>
                    </ButtonHaveAccount>
                    <Button>
                        <ChevronUp
                            style={{
                                opacity: chevronAnimation
                            }}
                            source={require('../assets/chevron.up.png')}
                        />
                        <AboutText>Conheça a idéia</AboutText>
                    </Button>
                </BottomView>
            </SafeArea>
            <BackgroundImage source={backgroundImage} />
        </>
    )
}