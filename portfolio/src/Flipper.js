import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

// Expanded spectrum colors for each character
const spectrumColors = [
  "#FF0000", "#FF2400", "#FF4500", "#FF6347", "#FF7F00", "#FF8C00", "#FFA500",
  "#FFD700", "#FFFF00", "#ADFF2F", "#7FFF00", "#32CD32", "#00FF00", "#00FA9A",
  "#00FFFF", "#00BFFF", "#1E90FF", "#4169E1", "#0000FF", "#8A2BE2", "#9400D3",
  "#9932CC", "#8B008B", "#FF00FF", "#FF1493", "#FF69B4",
];

const Flipper = ({ words, onFlipperStateChange }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState([]);
  const [charColors, setCharColors] = useState([]);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const targetWord = words[currentWordIndex].split("");
    setDisplayedChars(targetWord.map(() => getRandomLetter()));
    setCharColors(targetWord.map((_, index) => getFixedSpectrumColor(index)));

    let charIntervals = [];
    onFlipperStateChange(currentWordIndex, true); // Notify that flipper has started

    // Cycle through letters for each character
    targetWord.forEach((targetChar, i) => {
      charIntervals[i] = setInterval(() => {
        setDisplayedChars((prevChars) => {
          const newChars = [...prevChars];
          const currentCharIndex = alphabet.indexOf(newChars[i]) + 1;
          const nextChar = alphabet[currentCharIndex % alphabet.length];
          newChars[i] = nextChar;
          return newChars;
        });
      }, 150);

      // Stop cycling once the target character is reached
      setTimeout(() => {
        clearInterval(charIntervals[i]);
        setDisplayedChars((prevChars) => {
          const newChars = [...prevChars];
          newChars[i] = targetChar;
          return newChars;
        });
      }, 3000 + i * 300);
    });

    // Move to the next word after a pause
    const wordTimeout = setTimeout(() => {
      const nextIndex = (currentWordIndex + 1) % words.length;
      setCurrentWordIndex(nextIndex);
      onFlipperStateChange(nextIndex, false); // Notify that flipper has stopped
    }, 5000 + targetWord.length * 300);

    return () => {
      charIntervals.forEach(clearInterval);
      clearTimeout(wordTimeout);
    };
  }, [currentWordIndex, words, onFlipperStateChange]);

  return (
    <Flex justify="center" align="center" h="auto" py="2">
      <Flex>
        {displayedChars.map((char, index) => (
          <Box
            key={index}
            w="2.5rem"
            h="3rem"
            bg="#0D0D0D"
            mx="0.1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="0.25rem"
          >
            <Box
              color={charColors[index]}
              fontSize="2rem"
              fontWeight="bold"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {char}
            </Box>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

// Helper functions
const getRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const getFixedSpectrumColor = (index) => {
  return spectrumColors[index % spectrumColors.length];
};

export default Flipper;
