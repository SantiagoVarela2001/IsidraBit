import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

const Video = ({ url }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const extractVideoId = () => {
      const youtubeFormats = [
        'https://youtu.be/',
        'https://www.youtube.com/watch?v=',
        'https://www.youtube.com/embed/',
      ];

      let id = '';

      for (let format of youtubeFormats) {
        if (url.includes(format)) {
          id = url.split(format)[1].split('?')[0];
          break;
        }
      }

      if (id) {
        setVideoId(id);
        setShowVideo(true);
      }
    };

    extractVideoId();
  }, [url]);

  return (
    <div className="video">
      {showVideo ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls={true}
          width={320}
          height={180}
          light={true}
        />
      ) : (
        <p>URL de video no válida.</p>
      )}
    </div>
  );
};

export default Video;
