import React from 'react';
import LibrarySong from "./LibrarySong";

const Library = ({ audioRef, libraryStatus, isPlaying, songs, setSongs, setCurrentSong }) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                { songs.map(song => (
                    <LibrarySong key={song.name} audioRef={audioRef} setSongs={setSongs} isPlaying={isPlaying} song={song} songs={songs} setCurrentSong={setCurrentSong} />
                )) }
            </div>
        </div>
    );
};

export default Library;
