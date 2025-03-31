import Settings from "./components/Settings";
import { useTimer } from "./hooks/useTimer";
import { Timer } from "./components/Timer";

const App = () => {
  return (
    <div className="bg-background text-foreground h-screen flex items-center justify-center">
      <div className=" max-w-3xl min-h-full w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Timer />
        {/* <Settings setStage={setStage} currentStage={stage} /> */}
      </div>
    </div>
  );
};

export default App;
