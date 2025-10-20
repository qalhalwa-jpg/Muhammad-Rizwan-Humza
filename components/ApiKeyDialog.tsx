import React from 'react';

interface ApiKeyDialogProps {
  onKeySelected: () => void;
}

export const ApiKeyDialog = ({ onKeySelected }: ApiKeyDialogProps) => {
  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // As per guideline, assume selection is successful to avoid race condition
        onKeySelected();
      } catch (e) {
        console.error("Failed to open API key selection:", e);
      }
    } else {
        alert("API key selection utility is not available.");
    }
  };

  return (
    <div style={{padding: '1rem', backgroundColor: '#FFF3CD', borderLeft: '4px solid #FFC107', color: '#664D03', width: '100%'}}>
      <h3 style={{fontWeight: 'bold'}}>API Key Required</h3>
      <p>
        To generate videos with Veo, you need to select a project with an enabled
        API key.
      </p>
      <p style={{marginTop: '0.5rem'}}>
        For more information on billing, please visit:{' '}
        <a
          href="https://ai.google.dev/gemini-api/docs/billing"
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: 'underline'}}
        >
          ai.google.dev/gemini-api/docs/billing
        </a>
      </p>
      <button
        onClick={handleSelectKey}
        style={{marginTop: '1rem', backgroundColor: '#0D6EFD', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer'}}
      >
        Select API Key
      </button>
    </div>
  );
};