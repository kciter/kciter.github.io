import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

interface ImageProps {
  src: string;
  caption?: string;
  width?: number;
  maxWidth?: number;
  expandable?: boolean;
}

const Image = ({ src, caption, width, maxWidth, expandable }: ImageProps) => {
  const [isExpanded, toggleExpanded] = useState(false);

  console.log(isExpanded);

  return (
    <figure>
      <img
        src={src}
        width={width || '100%'}
        style={{ cursor: expandable ? 'zoom-in' : 'default', maxWidth }}
        onClick={expandable ? () => toggleExpanded(true) : undefined}
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
                maxWidth: 1440,
                width: '100%',
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

export default Image;
