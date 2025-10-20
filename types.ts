export interface VideoGenerationResult {
  uri: string;
  prompt: string;
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
      // FIX: Add missing properties to align with the full AIStudio type definition.
      getHostUrl: () => string;
      getModelQuota: () => Promise<unknown>;
    };
  }
}
