
import { useState, useEffect } from 'react';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { playerSetting, newsong } from '../musicPlayerServices';
import MainView from './Screens/MainView';







function App() {
  const [playerReady, setplayerReady] = useState(false);
  async function setter() {

    let settingDone = await playerSetting();
    if (settingDone) {
      await newsong()
    }
    setplayerReady(settingDone)

  }
  useEffect(() => {
    setter()
  }, [])
if(!setplayerReady){


  return (
    <SafeAreaView>
     <ActivityIndicator />
    </SafeAreaView>
  );}

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={"light-content"}/>
      <MainView/>


    </View>
  )
}

const styles = StyleSheet.create({

  Container: {
    flex: 1,
  }
});

export default App;
