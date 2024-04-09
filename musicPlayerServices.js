import TrackPlayer, { Event, RepeatMode, TrackType } from "react-native-track-player";
import { songList } from "./src/Constant";


export async function playerSetting(){
    let settingDone=false
    try {
        await TrackPlayer.getProgress().then((progress) => progress.duration)
        settingDone=true
    } catch (error) {
        await TrackPlayer.setupPlayer()
        settingDone=true
    }
    finally{
        return settingDone;
    }
}
export async function newsong(){
    await TrackPlayer.add(songList)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
 
export async function playbackService(){
    TrackPlayer.addEventListener(Event.RemotePause,()=>{
        TrackPlayer.pause
    })
    TrackPlayer.addEventListener(Event.RemotePlay),()=>{
        TrackPlayer.play
    }

    TrackPlayer.addEventListener(Event.RemoteNext),()=>{
        TrackPlayer.skipToNext
    }
    TrackPlayer.addEventListener(Event.RemotePrevious),()=>{
        TrackPlayer.skipToPrevious
    }
}