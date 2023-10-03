import { useState } from 'react';

const INITIAL_INDEX = -1;

const useIndexByArrowKey = (maxIndex: number) => {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  const changeCurrentIndex = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    if (event.nativeEvent.isComposing) return;

    event.preventDefault();
    if (event.key === 'ArrowUp' && currentIndex >= 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    if (event.key === 'ArrowDown' && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const resetCurrentIndex = () => {
    setCurrentIndex(INITIAL_INDEX);
  };

  return [currentIndex, changeCurrentIndex, resetCurrentIndex] as const;
};

export default useIndexByArrowKey;
