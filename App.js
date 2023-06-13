import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';
import { Alert, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';

export default function App() {
  function chooseRandomImage() {
    const images = [
      require('./assets/Pets/cat.jpg'),
      require('./assets/Pets/dog.jpg')
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const backgroundImage = chooseRandomImage();

  return (
    <>
      <SafeArea>
        <TopView>
          <LogoText>Achei o Bicho</LogoText>
        </TopView>
        <BottomView>
          <ButtonCreateAccount>
            <ButtonText>Abrir sua conta</ButtonText>
          </ButtonCreateAccount>
          <ButtonHaveAccount>
            <HaveAccountButtonText>Já tenho conta</HaveAccountButtonText>
          </ButtonHaveAccount>
          <Button>
            <AboutText>Conheça a idéia</AboutText>
          </Button>
        </BottomView>
      </SafeArea>
      <BackgroundImage source={backgroundImage} />
      <StatusBar style="auto" />
    </>
  );
}

const BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`

const SafeArea = styled.SafeAreaView`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`

const TopView = styled.View`
  margin-top: 15%;
`

const LogoText = styled.Text`
  font-size: 30px;
  font-weight: 700;
`

const BottomView = styled.View`
  width: 90%;
  height: 22%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
`

const ButtonCreateAccount = styled(Button)`
  background-color: purple;
  border: 2px solid purple;
`

const ButtonHaveAccount = styled(Button)`
  border: 2px solid white;
`

const ButtonText = styled.Text`
  text-transform: uppercase;
  color: white;
  font-size: 16px;
  font-weight: 700;
`

const HaveAccountButtonText = styled(ButtonText)`
  color: white;
`

const AboutText = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 16px;
`