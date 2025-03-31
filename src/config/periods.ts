import { PomodoroStage } from "@/utils/time";

export const periods: { id: PomodoroStage; label: string; icon: string }[] = [
  { id: "work", label: "Work", icon: "🔥" },
  { id: "shortBreak", label: "Pause", icon: "☕" },
  { id: "longBreak", label: "Break", icon: "😴" },
]; 