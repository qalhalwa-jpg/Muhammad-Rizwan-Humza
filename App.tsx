
import React, { useState, useEffect } from 'react';
import { PromptForm } from './components/PromptForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { VideoResult } from './components/VideoResult';
import { ApiKeyDialog } from './components/ApiKeyDialog';
import { generateVideo } from './services/geminiService';
import { VideoGenerationResult } from './types';

// Mocking window.aistudio for development purposes if it doesn't exist.
// In a real environment, this would be provided by the host.
if (typeof window !== 'undefined' && !window.aistudio) {
  console.log("Mocking window.aistudio for development.");
  // FIX: Add missing properties to the mock object to conform to the AIStudio type.
  window.aistudio = {
    hasSelectedApiKey: () => Promise.resolve(true),
    openSelectKey: () => Promise.resolve(),
    getHostUrl: () => '',
    getModelQuota: () => Promise.resolve({}),
  };
}


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VideoGenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isKeySelected, setIsKeySelected] = useState(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        try {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setIsKeySelected(hasKey);
        } catch (e) {
            console.error("Error checking for API key:", e);
            setIsKeySelected(false);
        }
      }
    };
    checkApiKey();
  }, []);

  const handleKeySelected = () => {
    setIsKeySelected(true);
    setError(null); // Clear previous errors
  };

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const videoUri = await generateVideo(prompt);
      setResult({ uri: videoUri, prompt });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      // As per guidelines, if the error is about API key, reset the key selection state.
      if (errorMessage.includes('API key not found or invalid')) {
        setIsKeySelected(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <header style={{textAlign: 'center', margin: '2rem 0'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>AI Video Generator</h1>
        <p style={{fontSize: '1.1rem', color: '#555'}}>
          Bring your ideas to life with Gemini
        </p>
      </header>

      {!isKeySelected ? (
        <ApiKeyDialog onKeySelected={handleKeySelected} />
      ) : (
        <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}

      {error && <div style={{marginTop: '1rem', color: '#D8000C', backgroundColor: '#FFD2D2', padding: '1rem', borderRadius: '0.5rem'}}>{error}</div>}
      
      {isLoading && <LoadingIndicator />}
      
      {result && <VideoResult result={result} />}

    </div>
  );
};

export default App;