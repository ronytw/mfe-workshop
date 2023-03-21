import React, { useRef, useEffect } from 'react';

export default function User({ onLoginSuccessful }) {
  const ref = useRef(null);

  const renderMicrofrontend = () => {
    window.mountUserMfe(ref.current, onLoginSuccessful);
  }

  useEffect(() => {
    if (window && document && !document.getElementById('app-user')) {
      const script = document.createElement('script');
      script.id = 'app-user';
      script.src = 'http://localhost:8084/main.bundle.js';
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