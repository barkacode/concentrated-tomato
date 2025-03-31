import { PomodoroStage } from "@/utils/time";
import { periods } from "@/config/periods";

interface StageSelectorProps {
  selectedStage: PomodoroStage;
  onStageChange: (stage: PomodoroStage) => void;
}

export const StageSelector = ({ selectedStage, onStageChange }: StageSelectorProps) => (
  <div className="flex space-x-4 mt-4">
    {periods.map((period) => (
      <div key={period.id} className="flex flex-1">
        <input
          type="radio"
          name="period"
          id={period.id}
          checked={selectedStage === period.id}
          onChange={() => onStageChange(period.id)}
          className="hidden peer"
        />
        <label
          htmlFor={period.id}
          className="flex flex-1 flex-col items-center rounded-lg peer bg-neutral-400 text-black px-4 peer-checked:bg-rose-500 peer-checked:text-white"
        >
          <div>{period.label}</div>
          <div>{period.icon}</div>
        </label>
      </div>
    ))}
  </div>
); 