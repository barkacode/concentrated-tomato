import { PomodoroStage } from "./time";

const STORAGE_KEY = "pomodoro-settings";
export const SETTINGS_CHANGED_EVENT = "pomodoro-settings-changed";

const DEFAULT_DURATIONS: Record<PomodoroStage, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

interface StoredSettings {
  durations: Record<PomodoroStage, number>;
}

let cachedSettings: StoredSettings | null = null; // Cache en mémoire

export const getDefaultSettings = (): StoredSettings => ({
  durations: { ...DEFAULT_DURATIONS },
});

export const loadSettings = (): StoredSettings => {
  if (cachedSettings) return cachedSettings; // Utilisation du cache si disponible

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultSettings();
    cachedSettings = JSON.parse(stored) as StoredSettings;
    return cachedSettings;
  } catch (error) {
    console.error("Error loading settings from localStorage:", error);
    return getDefaultSettings();
  }
};

export const saveSettings = (settings: StoredSettings): void => {
  try {
    cachedSettings = settings; // Mise à jour du cache
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(SETTINGS_CHANGED_EVENT, { detail: settings }));
    }
  } catch (error) {
    console.error("Error saving settings to localStorage:", error);
  }
};

export const getStageDurationFromStorage = (stage: PomodoroStage): number => {
  return loadSettings().durations[stage];
};

export const setStageDurationInStorage = (stage: PomodoroStage, duration: number): void => {
  const settings = loadSettings();
  settings.durations[stage] = duration;
  saveSettings(settings);
};

// Écouter les changements pour invalider le cache si d'autres onglets modifient localStorage
window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY) {
    cachedSettings = null; // Invalidation du cache
  }
});

// Gestion des événements internes
export const addSettingsChangeListener = (callback: (settings: StoredSettings) => void): (() => void) => {
  const handleCustomEvent = (event: CustomEvent<StoredSettings>) => {
    cachedSettings = event.detail; // Mise à jour du cache
    callback(event.detail);
  };

  window.addEventListener(SETTINGS_CHANGED_EVENT, handleCustomEvent as EventListener);

  return () => {
    window.removeEventListener(SETTINGS_CHANGED_EVENT, handleCustomEvent as EventListener);
  };
};
