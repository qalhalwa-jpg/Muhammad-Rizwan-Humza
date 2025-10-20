import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptForm = ({ onSubmit, isLoading }: PromptFormProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{width: '100%', maxWidth: '600px'}}>
      <div style={{display: 'flex', alignItems: 'center', borderBottom: '2px solid teal', padding: '0.5rem 0'}}>
        <input
          style={{appearance: 'none', background: 'transparent', border: 'none', width: '100%', color: '#333', marginRight: '0.75rem', padding: '0.25rem 0.5rem', lineHeight: 'tight', outline: 'none'}}
          type="text"
          placeholder="e.g., A neon hologram of a cat driving at top speed"
          aria-label="Video prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <button
          style={{flexShrink: 0, backgroundColor: 'teal', color: 'white', fontSize: '0.875rem', border: '1px solid teal', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer', opacity: isLoading ? 0.5 : 1}}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Video'}
        </button>
      </div>
    </form>
  );
};