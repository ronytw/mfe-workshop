import React, { useRef, useEffect } from 'react';

export default function MicroFrontend({ src }) {
  const ref = useRef(null);

  const renderMicrofrontend = () => {
    window.mountReviewMfe(ref.current);
  }

  useEffect(() => {
    if (window && document) {
      const script = document.createElement('script');
      script.id = 'app-user';
      script.src = src;
      script.onload = renderMicrofrontend;
      document.head.appendChild(script);
    } else {
      renderMicrofrontend();
    }
  }, []);

  return (
    <div ref={ref} />
  )
}