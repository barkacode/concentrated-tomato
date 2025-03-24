export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};
// 1. Définition des types
export type PomodoroStage = "work" | "shortBreak" | "longBreak";

interface PomodoroConfig {
  duration: number;
  title: string;
  message: string;
  color?: string; // Optionnel pour le futur
  sound?: string; // Optionnel pour le futur
}

// 2. Configuration centralisée et typée
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
    duration: 15 * 60, // 15 minutes
    title: "Long Break",
    message: "Take a long break!",
  },
} as const;

export const getStageDuration = (stage: PomodoroStage): number => {
  return POMODORO_CONFIG[stage].duration;
};

export const getStageMessage = (stage: PomodoroStage): string => {
  return POMODORO_CONFIG[stage].message;
};

export const getStageTitle = (stage: PomodoroStage): string => {
  return POMODORO_CONFIG[stage].title;
};
