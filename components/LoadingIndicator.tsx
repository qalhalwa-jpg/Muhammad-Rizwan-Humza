import React from 'react';
import { LoadingIcon } from './icons';

const messages = [
  'Warming up the pixels...',
  'Teaching the AI to dream...',
  'Composing a visual masterpiece...',
  'Rendering the digital ether...',
  'This might take a few minutes. Great art needs patience!',
];

export const LoadingIndicator = () => {
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
      <LoadingIcon />
      <p style={{marginTop: '1rem', fontSize: '1.1rem', color: '#555'}}>{message}</p>
    </div>
  );
};