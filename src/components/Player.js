import React  from 'react';
import { playAudio } from '../util/playAudio';
import { IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Player = ({ songs, setSongs, setCurrentSong, songInfo, setSongInfo, audioRef, currentSong, isPlaying, setIsPlaying }) => {

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    };

    const skipTrackHandler = async (direction) => {
      let currentIndex = songs.findIndex(song => song.id === currentSong.id);

      if (direction === 'skip-forward') {
        await setCurrentSong(songs[(currentIndex+1) % songs.length]);
        await activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
      }

      if (direction === 'skip-back') {
          if ((currentIndex-1) % songs.length === -1) {
              await setCurrentSong(songs[songs.length-1]);
              await activeLibraryHandler(songs[songs.length-1]);
              await playAudio(isPlaying, audioRef);
              return;
          }
          await setCurrentSong(songs[(currentIndex-1) % songs.length]);
          await activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
      }
      await playAudio(isPlaying, audioRef);
    };

    const activeLibraryHandler = async (nextPrev) => {
        const newSongs = songs.map(s => {
            if(s.id === nextPrev.id) {
                return {
                    ...s,
                    active: true,
                }
            } else {
                return {
                    ...s,
                    active: false
                }
            }
        });
        await setSongs(newSongs);
        // await playAudio(isPlaying, audioRef);
    };

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <IconButton onClick={() => skipTrackHandler('skip-back')} className='skip-back'>
                    <KeyboardArrowLeftIcon fontSize='large' />
                </IconButton>
                <IconButton onClick={playSongHandler} className='play' >
                    {isPlaying ? < PauseIcon style = {{fontSize: 45}} /> : <PlayArrowIcon style={{ fontSize: 45 }}/> }
                </IconButton>
                <IconButton onClick={() => skipTrackHandler('skip-forward')} className='ski-forward'>
                    <KeyboardArrowRightIcon fontSize='large' />
                </IconButton>
            </div>
        </div>
    );
};

export default Player;
