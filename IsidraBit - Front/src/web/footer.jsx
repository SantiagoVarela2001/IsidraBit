import React from 'react';
import instagramImg from '../assets/instagram.png';
import youtubeImg from '../assets/youtube.png';
import spotifyImg from '../assets/spotify.png';

const Footer = () => {
  return (
    <footer>
      <div className='contenedor-footer'>
        <a href="https://www.instagram.com/isidra_bit/" target="_blank" rel="noopener noreferrer">
          <img src={instagramImg} alt="Instagram" className="imgFooter" />
        </a>

        <a href="https://www.youtube.com/channel/UCD5TSNNoDvnXwvz9biaiv2Q" target="_blank" rel="noopener noreferrer">
          <img src={youtubeImg} alt="YouTube" className="imgFooter" />
        </a>

        <a href="https://open.spotify.com/intl-es/artist/2G7C7BocjjvINWakHJoSEw?si=TdWwx7oJQ--WbXEHHKSrow" target="_blank" rel="noopener noreferrer">
          <img src={spotifyImg} alt="Spotify" className="imgFooter" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;