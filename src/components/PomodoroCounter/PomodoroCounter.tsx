import { getParsedTime } from "../../utils/getParseTime";
import useHandleAlarmSound from "./useHandleAlarmSound";
import useHandleTimeInterval from "./useHandleTimeInterval";

export default function PomodoroCounter() {
  const {
    isAlarmPlaying,
    handleStopAlarm,
    handlePlayAlarmSound,
    handleResetAlarmSound,
  } = useHandleAlarmSound();

  const { timer, runInterval, handleStart, handlePause } =
    useHandleTimeInterval({ handlePlayAlarmSound, handleResetAlarmSound });

  return (
    <section className="flex flex-col gap-6 justify-center items-center">
      <article
        style={{ width: 300, height: 300 }}
        className=" flex flex-col justify-center items-center rounded-full border-2 border-gray-300"
      >
        <h1 className="text-6xl font-bold">{getParsedTime(timer)}</h1>
      </article>
      <footer>
        <button
          onClick={() => {
            if (runInterval) return handlePause();
            if (isAlarmPlaying) return handleStopAlarm();
            handleStart();
          }}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm  text-center w-20 h-10"
        >
          {runInterval ? "pause" : isAlarmPlaying ? "stop" : "play"}
        </button>
      </footer>
    </section>
  );
}
