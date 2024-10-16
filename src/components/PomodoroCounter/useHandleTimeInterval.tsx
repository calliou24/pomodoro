import { useEffect, useState } from "react";
import {
  SECONDS_IN_MILLISECONDS,
  WORK_TIMER,
  REST_TIMER,
  WORK_TIME_KEY,
  REST_TIME_KEY,
} from "../../constants/global_constants";

type UseHandleTimeIntervalProps = {
  handlePlayAlarmSound: () => void;
  handleResetAlarmSound: () => void;
};

export default function useHandleTimeInterval({
  handlePlayAlarmSound,
  handleResetAlarmSound,
}: UseHandleTimeIntervalProps) {
  const [timer, setTimer] = useState<number>(WORK_TIMER);

  const [timerType, setTimerType] = useState<string>(WORK_TIME_KEY);
  const [runInterval, setRunInterval] = useState<boolean>(false);

  const handleStart = () => {
    setRunInterval(true);

    handleResetAlarmSound();
  };

  const handlePause = () => {
    setRunInterval(false);
  };

  const handleFinishTimer = () => {
    const changeToRestTimer = timerType === WORK_TIME_KEY;

    handlePlayAlarmSound();

    const newTimer = changeToRestTimer ? REST_TIMER : WORK_TIMER;
    const newTimerType = changeToRestTimer ? REST_TIME_KEY : WORK_TIME_KEY;

    setRunInterval(false);

    setTimer(newTimer);
    setTimerType(newTimerType);
  };

  useEffect(() => {
    if (!runInterval) return;

    const timerInterval = setInterval(() => {
      if (timer > 0) return setTimer((prev) => prev - 1);

      handleFinishTimer();
    }, SECONDS_IN_MILLISECONDS);

    return () => clearInterval(timerInterval);
  }, [runInterval, timerType, timer]);

  return {
    timer,
    runInterval,
    handleStart,
    handlePause,
  };
}
