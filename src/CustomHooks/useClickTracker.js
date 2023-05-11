import { useState } from "react";
import uploadClicks from "../uploadClicks";

function useClickTracker(initClicks, user) {
  const [clicks, setClicks] = useState(initClicks);

  const handleClickTracker = (id) => {
    setClicks((prevClicks) => {
      const newClick = {
        timestamp: Date.now(),
        id: id,
      }
      const newClicks = [
        ...prevClicks,
        newClick,
      ];
      uploadClicks(newClick, user);
      return newClicks;
    });
  };

  return { clicks, handleClickTracker };
}

export default useClickTracker;
