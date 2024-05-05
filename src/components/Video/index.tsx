import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

interface ImageProps {
  src: string;
  caption?: string;
  width?: number;
  expandable?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

const Video = ({
  src,
  caption,
  width,
  expandable,
  autoPlay,
  controls,
  muted,
  loop,
  playsInline
}: ImageProps) => {
  const [isExpanded, toggleExpanded] = useState(false);

  return (
    <figure>
      <video
        src={src}
        width={width}
        style={{ cursor: expandable ? 'zoom-in' : 'default' }}
        onClick={expandable ? () => toggleExpanded(true) : undefined}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      />
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
      {isExpanded &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'zoom-out',
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}
            onClick={() => toggleExpanded(false)}
          >
            <div
              style={{
                borderRadius: 8,
                maxWidth: 1200,
                width: '80%',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white'
              }}
            >
              <img src={src} width="100%" />
            </div>
          </div>,
          document.body
        )}
    </figure>
  );
};

export default Video;
