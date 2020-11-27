import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeDown';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function VolumePopup({ audioRef }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [volume, setVolume] = React.useState(
    audioRef.current ? audioRef.current.volume * 100 : 100
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const dragHandler = (e) => {
    console.log('To output', Math.floor(e.target.value) / 100);
    setVolume(Math.floor(e.target.value));
    audioRef.current.volume = Math.floor(e.target.value) / 100;
  };

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <VolumeUpIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          <VolumeDown />
          <input
            min={0}
            max={100}
            value={volume}
            onChange={dragHandler}
            type="range"
          />
          <VolumeUp />
        </Typography>
      </Popover>
    </div>
  );
}
