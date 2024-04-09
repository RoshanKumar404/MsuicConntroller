import { View, Text, Dimensions,StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrackPlayerimport, {Event ,Track,useTrackPlayerEvents } from 'react-native-track-player'
import { songList } from '../Constant'
import TheUI from '../components/TheUi'
import Sliderr from '../components/Slider'
import SongsInformation from '../components/Songs'
import TrackPlayer from 'react-native-track-player'
 //{Event,useTrackPlayerEvents,Track} from 'react-native-track-player'

 const {width}=Dimensions.get('window')
const MainView = () => {

    const [track,settrack]=useState<Track|null>()
    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged],async event => {
        switch (event.type) {
            case Event.PlaybackActiveTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.lastPosition+2)
                settrack(playingTrack)
                break;
            }
        })
    const imagesAndOtherStuff= ()=>{
        return(
            <View style={styles.listArtWrapper}>
                <View style={styles.albumContainer}>
                    {track?.artwork &&(
                        <Image
                        style={styles.albumArtImg}
                        source={{uri:track?.artwork?.toString()}}
                        />
                    )}
                </View>
            </View>
        )
    }
  return (
    <View style={styles.container}>
      <FlatList 
      horizontal
      data={songList}
      renderItem={imagesAndOtherStuff}
      keyExtractor={song => song.id.toString}
      />
      <SongsInformation track={track}/>
      <Sliderr/>
      <TheUI/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001d23',
    },
    listArtWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
    albumContainer: {
      width: 300,
      height: 300,
    },
    albumArtImg: {
      height: '100%',
      borderRadius: 4,
    },
  });
export default MainView
