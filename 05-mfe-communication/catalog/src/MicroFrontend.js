import React, { useEffect } from 'react';

const MicroFrontend = ({ src, elementId }) => {
  useEffect(() => {
    if (window && document) {
      const script = document.createElement('script');
      const body = document.getElementsByTagName('body')[0];
      script.id = 'customer-reviews';
      script.src = src;
      body.appendChild(script);
    }
  }, [])

  return (
    <div id={elementId} />
  )
}

export default MicroFrontend;