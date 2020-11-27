import React from 'react';
import logo from './../assets/images/wavies.png';

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <div>
        <img src={logo} alt="" />
        <h1>Wavies</h1>
      </div>
      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className={`${libraryStatus ? 'button-active' : ''}`}
      >
        Library
      </button>
    </nav>
  );
};

export default Nav;
