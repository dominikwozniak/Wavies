import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import logo from './../assets/images/wavies.png';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <div>
        <img src={logo} alt=""/>
        <h1>Wavies</h1>
      </div>
      <button onClick={() => setLibraryStatus(!libraryStatus)} className={`${libraryStatus ? 'button-active' : ''}`} >
        Library
      </button>
    </nav>
  );
};

export default Nav;
