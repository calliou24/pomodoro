import { useState } from "react";
import { SECONDS_IN_MILLISECONDS } from "../../constants/global_constants";

let SOUND_ALARM = new Audio("/audios/stop-sound.mp3");
SOUND_ALARM.volume = 0.1;

export default function useHandleAlarmSound() {
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);

  const handleResetAlarmSound = () => {
    SOUND_ALARM.pause();
    SOUND_ALARM.currentTime = 0;
  };

  const handlePlayAlarmSound = () => {
    setIsAlarmPlaying(true);
    SOUND_ALARM.play();

    setTimeout(() => {
      SOUND_ALARM.pause();
      setIsAlarmPlaying(false);
    }, SECONDS_IN_MILLISECONDS * 25);
  };

  const handleStopAlarm = () => {
    handleResetAlarmSound();
    setIsAlarmPlaying(false);
  };

  return {
    isAlarmPlaying,
    handleStopAlarm,
    handlePlayAlarmSound,
    handleResetAlarmSound,
  };
}
