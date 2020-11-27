import React from 'react';
import { playAudio } from '../util/playAudio';

const LibrarySong = ({
  audioRef,
  isPlaying,
  song,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    await setSongs(newSongs);
    await playAudio(isPlaying, audioRef);
  };

  return (
    <div
      className={`library-song ${song.active ? 'selected' : ''}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
