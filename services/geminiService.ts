import { GoogleGenAI } from '@google/genai';
import { VideosOperation } from '@google/genai/server';

export async function generateVideo(prompt: string): Promise<string> {
  // Per Veo guidelines, check for API key selection.
  // The UI should handle this check before calling, but we can double-check here.
  if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
    // In a real app, you might want a more robust way to trigger the UI flow again.
    // For now, we throw an error that the UI can catch.
    await window.aistudio.openSelectKey();
    // After opening, we assume a key is selected. The next API call will confirm.
  }

  // Per guidelines, create a new instance right before the API call for Veo.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    let operation: VideosOperation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9',
      },
    });

    while (!operation.done) {
      // Poll every 10 seconds as suggested in the docs
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (downloadLink) {
      // As per docs, we need to append the API key to fetch the video
      return `${downloadLink}&key=${process.env.API_KEY}`;
    } else {
      console.error("Video generation operation finished but returned no link.", operation);
      throw new Error('Video generation failed or returned no link.');
    }
  } catch (error) {
    console.error('Error generating video:', error);
    if (error instanceof Error && error.message.includes('Requested entity was not found.')) {
        // As per guidelines, this error indicates an API key problem.
        throw new Error('API key not found or invalid. Please select your API key again.');
    }
    // Re-throw other errors to be handled by the UI
    throw error;
  }
}
