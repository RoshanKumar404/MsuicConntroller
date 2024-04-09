import React from "react";
import { View } from "react-native";
import TrackPlayer, { PlaybackState,State, usePlaybackState } from "react-native-track-player";
import Icon from "react-native-vector-icons/MaterialIcons";
import { playbackService } from "../../musicPlayerServices";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

const TheUI=()=>{

    const playbackState=usePlaybackState()
    const NextSong=async()=>{
        await TrackPlayer.skipToNext()
    }
    const PreviousSong= async()=>{
        await TrackPlayer.skipToPrevious()
    }

    const PlayPause = async (playback: PlaybackState | { state: undefined }) => {
        const playingSong = await TrackPlayer.getActiveTrackIndex();
        if (playingSong !== null) {
            if (playback.state === State.Paused || playback.state === State.Ready || !playback.state) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    };
    
    
    


    return(
        <View style={styles.container}>
            <Pressable onPress={ PreviousSong}>
                <Icon style={styles.icon} name="skip-previous" size={40}/>
            </Pressable>
            <Pressable onPress={() => PlayPause(playbackState)}>
  <Icon
    style={styles.icon}
    name={playbackState.state === State.Playing ? "pause" : "play-arrow"}
    size={70}
  />
</Pressable>

            <Pressable onPress={NextSong}>
                <Icon style={styles.icon} name="skip-next" size={40}/>
            </Pressable>

        </View>
    )
}
const styles=StyleSheet.create({
container:{
    marginTop:56,
    flex:1,
    flexDirection:"row",
    alignItems:"center"
},
icon:{
    color:"#FFFFFF"
},
playbutton:{
    marginHorizontal:10
}

})

export default TheUI