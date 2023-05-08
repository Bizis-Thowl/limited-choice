import { useState } from "react";

function useClickTracker(initClicks) {
  const [clicks, setClicks] = useState(initClicks);

  const handleClickTracker = (id) => {
    setClicks((prevClicks) => {
      const newClicks = [
        ...prevClicks,
        {
          timestamp: Date.now(),
          id: id,
        },
      ];
      return newClicks;
    });
  };

  return { clicks, handleClickTracker };
}

export default useClickTracker;
