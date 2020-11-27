export const playAudio = async (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      await playPromise.then(() => audioRef.current.play());
    }
  }
};
