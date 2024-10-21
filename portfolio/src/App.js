import React, { useState } from "react";
import { ChakraProvider, Box, Flex, Text } from "@chakra-ui/react";
import Flipper from "./Flipper";
import Navbar from "./Navbar";

const App = () => {
  const words = ["PROGRAMMER", "FULLSTACK DEVELOPER", "AI & ML", "AUTOMATION"];
  const descriptions = [
    "Crafting code to solve complex problems.",
    "Building web applications from front to back.",
    "Implementing smart solutions using AI & ML.",
    "Automating processes for better efficiency."
  ];

  const [currentDescription, setCurrentDescription] = useState(descriptions[0]);
  const [showDescription, setShowDescription] = useState(false);

  // Callback function to update description when flipper changes
  const handleFlipperChange = (index, isRunning) => {
    //console.log(`Flipper State: ${isRunning ? "Running" : "Stopped"}, Index: ${index}`);
    if (isRunning) {
      setShowDescription(true); // Hide description when flipper starts
    } else {
      setCurrentDescription(descriptions[index]); // Set new description when flipper stops
      setTimeout(() => setShowDescription(true), 200); // Delay for smooth fade-in
    }
  };

  return (
    <ChakraProvider>
      <Navbar />

      {/* Main Section covering full viewport */}
      <Flex h="100vh" mt="60px" bg="#1A1A1A">
        {/* Left Partition - Placeholder Section */}
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="#1A1A1A"
          width="50%"
          height="100%"
        >
          <Text fontSize="4xl" fontWeight="bold" color="white">
            Left Section
          </Text>
        </Box>

        {/* Right Partition - Centered Content */}
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="#1A1A1A"
          width="50%"
          height="100%"
        >
          {/* Text 'I'M' */}
          <Text fontSize="4xl" fontWeight="semibold" color="rgba(220, 220, 220, 0.8)" mb="1">
            I AM
          </Text>

          {/* Text 'Syed Wali' */}
          <Text fontSize="5xl" fontWeight="bold" color="white" mb="1">
            SYED WALI
          </Text>

          {/* Flipper with callback */}
          <Box mt="1" mb="1">
            <Flipper words={words} onFlipperStateChange={handleFlipperChange} />
          </Box>

          {/* Description with fade-in/out effect */}
          <Text
            fontSize="lg"
            color="gray.300"
            textAlign="center"
            mt="1"
            transition="opacity 1s ease-in"
            opacity={showDescription ? 1 : 0}
            display={showDescription ? "block" : "none"}
          >
            {currentDescription}
          </Text>
        </Box>
      </Flex>

      {/* Projects Section */}
      <Box bg="#121212" color="white" py="20" px="10">
        <Text fontSize="4xl" fontWeight="bold" mb="8">
          Projects
        </Text>
        {/* Sample project components */}
        <Box mb="4" p="4" bg="gray.800" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold">Project 1</Text>
          <Text mt="2">Description of Project 1...</Text>
        </Box>
        <Box mb="4" p="4" bg="gray.800" borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold">Project 2</Text>
          <Text mt="2">Description of Project 2...</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
