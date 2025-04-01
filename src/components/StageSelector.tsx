import { PomodoroStage } from "@/utils/time";
import { periods } from "@/config/periods";

interface StageSelectorProps {
  selectedStage: PomodoroStage;
  onStageChange: (stage: PomodoroStage) => void;
}

export const StageSelector = ({
  selectedStage,
  onStageChange,
}: StageSelectorProps) => (
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
          className="flex flex-1 flex-col items-center justify-center aspect-square rounded-lg ring-2 ring-neutral-800 hover:bg-neutral-800 peer  peer-checked:ring-amber-300 peer-checked:text-white "
        >
          <div>
            {period.icon && <period.icon size={24} />}
          </div>
          <div className="text-lg font-medium ">{period.label}</div>
        </label>
      </div>
    ))}
  </div>
);
