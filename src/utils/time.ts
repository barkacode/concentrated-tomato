import { getStageDurationFromStorage } from "./localStorage";

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};

export type PomodoroStage = "work" | "shortBreak" | "longBreak";

interface PomodoroConfig {
  duration: number;
  title: string;
  message: string;
  color?: string;
  sound?: string;
}

export const POMODORO_CONFIG: Record<PomodoroStage, PomodoroConfig> = {
  work: {
    duration: 25 * 60, // 25 minutes en secondes
    title: "Work",
    message: "Back to work!",
  },
  shortBreak: {
    duration: 5 * 60, // 5 minutes en secondes
    title: "Short Break",
    message: "Take a short break!",
  },
  longBreak: {
    duration: 15 * 60, // 15 minutes en secondes
    title: "Long Break",
    message: "Take a long break!",
  },
} as const;

export const getStageDuration = (stage: PomodoroStage): number => {
  // Vérifie si nous sommes dans un environnement avec localStorage (le navigateur)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return getStageDurationFromStorage(stage);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }
  
  // Fallback aux valeurs par défaut si localStorage n'est pas disponible ou en cas d'erreur
  return POMODORO_CONFIG[stage].duration;
};

export const getStageMessage = (stage: PomodoroStage): string => {
  return POMODORO_CONFIG[stage].message;
};

export const getStageTitle = (stage: PomodoroStage): string => {
  return POMODORO_CONFIG[stage].title;
};
