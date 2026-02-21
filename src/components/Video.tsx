import { useState } from 'react';
import ReactDOM from 'react-dom';

interface VideoProps {
  src: string;
  caption?: string;
  width?: number | string;
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
}: VideoProps) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <figure>
      <video
        src={src}
        width={width}
        style={{ cursor: expandable ? 'zoom-in' : 'default' }}
        onClick={expandable ? () => setExpanded(true) : undefined}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      />
      {caption && <figcaption dangerouslySetInnerHTML={{ __html: caption }} />}
      {isExpanded &&
        typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'zoom-out',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000
            }}
            onClick={() => setExpanded(false)}
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
              <video src={src} width="100%" autoPlay loop muted playsInline />
            </div>
          </div>,
          document.body
        )}
    </figure>
  );
};

export default Video;
