import React, { useState, useRef } from 'react';
import './styles/app.scss'
import Song from "./components/Song";
import Player from "./components/Player";
import data from './util';
import Library from "./components/Library";
import Nav from './components/Nav';
import { playAudio } from './util/playAudio';

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    const [libraryStatus, setLibraryStatus] = useState(false);
    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime, duration});
    };

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex+1) % songs.length]);
        await playAudio(isPlaying, audioRef);
        return;
    };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library audioRef={audioRef} libraryStatus={libraryStatus} isPlaying={isPlaying} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} onEnded={songEndHandler} ref={audioRef} src={currentSong.audio}/>
    </div>
  );
}

export default App;
