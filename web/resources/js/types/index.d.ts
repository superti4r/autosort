export interface SharedData {
  name: string;
  version: string;
  quote?: {
    message: string;
    author: string;
  };

  // auth bisa nullable di awal setup
  auth?: {
    user?: unknown;
    projects?: unknown[];
    currentProject?: unknown;
  };

  // ziggy bisa optional dulu
  ziggy?: {
    location: string;
    [key: string]: unknown;
  };

  // flash message optional
  flash?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    [key: string]: unknown;
  };

  [key: string]: unknown; // supaya fleksibel pas setup
}
