import { PomodoroStage } from "@/utils/time";  
import { BriefcaseBusiness, Coffee, Bed } from "lucide-react";
import { LucideIcon } from "lucide-react";

export const periods: { id: PomodoroStage; label: string; icon: LucideIcon }[] = [
  { id: "work", label: "Work", icon: BriefcaseBusiness },
  { id: "shortBreak", label: "Pause", icon: Coffee },
  { id: "longBreak", label: "Break", icon: Bed },
]; 