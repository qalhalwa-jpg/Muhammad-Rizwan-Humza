import React from 'react';
import { VideoGenerationResult } from '../types';

interface VideoResultProps {
  result: VideoGenerationResult;
}

export const VideoResult = ({ result }: VideoResultProps) => {
  if (!result.uri) {
    return null;
  }

  return (
    <div style={{marginTop: '2rem', width: '100%'}}>
      <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Your Generated Video</h2>
      <video controls src={result.uri} style={{width: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
        Your browser does not support the video tag.
      </video>
      <p style={{marginTop: '0.5rem', fontSize: '0.875rem', color: '#666'}}>Prompt: {result.prompt}</p>
    </div>
  );
};