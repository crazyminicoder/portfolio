import React, { useState, useEffect, useRef } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Grid,
  Image,
  Center,
} from "@chakra-ui/react";
import Flipper from "./Flipper";
import Navbar from "./Navbar";
import { ForceGraph2D } from 'react-force-graph';
import projectImage1 from './images/w1.jpg';
import projectImage2 from './images/w1.png';
import projectImage3 from './images/w2.png';
import projectImage4 from './images/w3.png';

// Example projects data with local images
const projects = [
  {
    title: "PIXILIT",
    description: "A fun multiplayer game where the player guesses the movie name by looking at a pixelated poster that gets clearer as the time reaches the end.",
    imageUrl: projectImage1,
    technologies: ["React", "Node.js", "Material UI", "WebSockets"],
  },
  {
    title: "Facebook Clone",
    description: "This is a brief description of Project 2.",
    imageUrl: projectImage2,
    technologies: ["Python", "Flask", "PostgreSQL"],
  },
  {
    title: "Detecting Fake Reviews across E-Commerce Websites",
    description: "This is a brief description of Project 3.",
    imageUrl: projectImage3,
    technologies: ["Angular", "Express", "MongoDB"],
  },
  {
    title: "AI Integrated NextGenCars Website",
    description: "This is a brief description of Project 4.",
    imageUrl: projectImage4,
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "PIXILIT",
    description: "A fun multiplayer game where the player guesses the movie name by looking at a pixelated poster that gets clearer as the time reaches the end.",
    imageUrl: projectImage1,
    technologies: ["React", "Node.js", "Material UI", "WebSockets"],
  },
  {
    title: "Facebook Clone",
    description: "This is a brief description of Project 2.",
    imageUrl: projectImage2,
    technologies: ["Python", "Flask", "PostgreSQL"],
  },
  {
    title: "Detecting Fake Reviews across E-Commerce Websites",
    description: "This is a brief description of Project 3.",
    imageUrl: projectImage3,
    technologies: ["Angular", "Express", "MongoDB"],
  },
  {
    title: "AI Integrated NextGenCars Website",
    description: "This is a brief description of Project 4.",
    imageUrl: projectImage4,
    technologies: ["HTML", "CSS", "JavaScript"],
  },
];

// Define skills as nodes and relationships as links
const skillsData = {
  nodes: [
    { id: "Full Stack", group: 1 },
    { id: "Frontend", group: 2 },
    { id: "Backend", group: 2 },

    { id: "Programming", group: 1 },
    { id: "C", group: 3 },
    { id: "C++", group: 3 },
    { id: "Java", group: 3 },
    { id: "JavaScript", group: 3 },
    { id: "Python", group: 3 },
    { id: "R", group: 3 },
    { id: "SQL", group: 3 },

    { id: "Machine Learning", group: 1 },
    { id: "TensorFlow", group: 4 },
    { id: "PyTorch", group: 4 },
    { id: "Keras", group: 4 },
    { id: "Scikit-learn", group: 4 },

    { id: "Data Engineering", group: 1 },
    { id: "Tableau", group: 5 },
    { id: "Power BI", group: 5 },
    { id: "Azure Data Factory", group: 5 },
    { id: "ETL Processes", group: 5 },
    { id: "Data Integration", group: 5 },

    { id: "Web Technologies", group: 1 },
    { id: "React", group: 6 },
    { id: "Node.js", group: 6 },
    { id: "Express", group: 6 },
    { id: "Next.js", group: 6 },

    { id: "APIs and Data Formats", group: 1 },
    { id: "RESTful API", group: 7 },
    { id: "WebSocket API", group: 7 },
    { id: "JSON", group: 7 },
    { id: "XML", group: 7 },

    { id: "Automation Tools", group: 1 },
    { id: "UIPath", group: 8 },
    { id: "RPA", group: 8 },

    { id: "Cloud Platforms", group: 1 },
    { id: "AWS", group: 9 },
    { id: "Azure DevOps", group: 9 },

    { id: "Databases", group: 1 },
    { id: "MySQL", group: 10 },
    { id: "MongoDB", group: 10 },
    { id: "PostgreSQL", group: 10 },
  ],
  links: [
    // Full Stack Connections
    { source: "Full Stack", target: "Frontend" },
    { source: "Full Stack", target: "Backend" },
    { source: "Full Stack", target: "Databases" },
    { source: "Full Stack", target: "Automation Tools" },
    
    // Frontend Connections
    { source: "Frontend", target: "Web Technologies" },
    { source: "Web Technologies", target: "React" },
    { source: "Web Technologies", target: "Next.js" },
    { source: "Frontend", target: "JavaScript" },

    // Backend Connections
    { source: "Backend", target: "Node.js" },
    { source: "Backend", target: "Databases" },
    { source: "Backend", target: "Express" },
    { source: "Backend", target: "APIs and Data Formats" },

    // API Connections
    { source: "APIs and Data Formats", target: "RESTful API" },
    { source: "APIs and Data Formats", target: "WebSocket API" },
    { source: "APIs and Data Formats", target: "JSON" },
    { source: "APIs and Data Formats", target: "XML" },

    // Database Connections
    { source: "Databases", target: "MySQL" },
    { source: "Databases", target: "MongoDB" },
    { source: "Databases", target: "PostgreSQL" },

    // Programming Connections
    { source: "Programming", target: "C" },
    { source: "Programming", target: "C++" },
    { source: "Programming", target: "Java" },
    { source: "Programming", target: "JavaScript" },
    { source: "Programming", target: "Python" },
    { source: "Programming", target: "R" },
    { source: "Programming", target: "SQL" },

    // Machine Learning Connections
    { source: "Machine Learning", target: "TensorFlow" },
    { source: "Machine Learning", target: "PyTorch" },
    { source: "Machine Learning", target: "Keras" },
    { source: "Machine Learning", target: "Scikit-learn" },

    // Data Engineering Connections
    { source: "Data Engineering", target: "ETL Processes" },
    { source: "Data Engineering", target: "Data Integration" },
    { source: "Data Engineering", target: "Tableau" },
    { source: "Data Engineering", target: "Power BI" },
    { source: "Data Engineering", target: "Azure Data Factory" },

    // Automation Connections
    { source: "Automation Tools", target: "UIPath" },
    { source: "Automation Tools", target: "RPA" },

    // Cloud Connections
    { source: "Cloud Platforms", target: "AWS" },
    { source: "Cloud Platforms", target: "Azure DevOps" },

    // Cross Connections
    { source: "Machine Learning", target: "Data Engineering" },
    { source: "Web Technologies", target: "Backend" },
    { source: "Data Engineering", target: "Databases" },
    { source: "Cloud Platforms", target: "Data Engineering" },
  ],
};

const App = () => {
  const words = ["PROGRAMMER", "FULLSTACK DEVELOPER", "AI & ML", "AUTOMATION"];
  const descriptions = [
    "Crafting code to solve complex problems.",
    "Building web applications from front to back.",
    "Implementing smart solutions using AI & ML.",
    "Automating processes for better efficiency.",
  ];

  const [currentDescription, setCurrentDescription] = useState(descriptions[0]);
  const [showDescription, setShowDescription] = useState(true);
  const graphRef = useRef();

  // Callback function to update description when flipper changes
  const handleFlipperChange = (index) => {
    setCurrentDescription(descriptions[index]);
    setTimeout(() => setShowDescription(true), 300);
  };

  // Set initial zoom and centering of the graph
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.zoom(1.2); // Initial zoom level
      graphRef.current.centerAt(0, 0, 500); // Center the graph initially
    }
  }, []);

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
          <Text fontSize="4xl" fontWeight="semibold" color="rgba(220, 220, 220, 0.8)" mb="1">
            I AM
          </Text>

          <Text fontSize="5xl" fontWeight="bold" color="white" mb="1">
            SYED WALI
          </Text>

          {/* Flipper with callback */}
          <Box mt="1" mb="1">
            <Flipper words={words} onFlipperStateChange={handleFlipperChange} />
          </Box>

          <Text
            fontSize="lg"
            color="gray.300"
            textAlign="center"
            mt="1"
            transition="opacity 2s ease-in"
            opacity={showDescription ? 1 : 0}
            display={showDescription ? "block" : "none"}
          >
            {currentDescription}
          </Text>
        </Box>
      </Flex>

      {/* Projects Section */}
      <Box bg="#121212" color="white" py="20" px="10" height="100vh">
        <Flex justifyContent="center" mb="8">
          <Text fontSize="6xl" fontWeight="bold">
            Projects
          </Text>
        </Flex>

        {/* Grid for displaying project cards */}
        <Grid templateColumns="repeat(4, 1fr)" gap={8} py="20">
          {projects.map((project, index) => (
            <Box
              key={index}
              bg="gray.800"
              borderRadius="md"
              overflow="hidden"
              w="100%"
              mx="auto"
              cursor="pointer"
              position="relative"
              height="262px"
              _hover={{ height: "450px" }}
              display="flex"
              flexDirection="column"
              transition="height 0.4s ease"
            >
              {/* Project Image */}
              <Image
                src={project.imageUrl}
                alt={project.title}
                w="100%"
                h="200px"
                objectFit="cover"
                borderTopRadius="md"
              />

              {/* Project Title */}
              <Flex
                p="4"
                justifyContent="center"
                alignItems="center"
                bg="gray.900"
              >
                <Text fontSize="xl" fontWeight="bold" color="white">
                  {project.title}
                </Text>
              </Flex>

              {/* Project Details */}
              <Text fontSize="md" mb="2" textAlign="center" color="white" py="25">
                {project.description}
              </Text>
              <Flex gap="2" mt="2" wrap="wrap" justifyContent="center" pb="25">
                {project.technologies.map((tech, idx) => (
                  <Box
                    key={idx}
                    p="1"
                    bg="gray.600"
                    borderRadius="md"
                    fontSize="sm"
                    color="white"
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Skills Section */}
      <Box bg="#EDEADE" color="Black" py="20" px="10" height="100vh">
        <Flex justifyContent="center" mb="8">
          <Text fontSize="6xl" fontWeight="bold">
            Skills
          </Text>
        </Flex>
        <Center>
          <Box
            width="100%"
            height="100%"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ForceGraph2D
  ref={graphRef}
  graphData={skillsData}
  nodeLabel={(node) => `${node.id}: Click to know more`}
  linkColor={(link) => (link.type === "strong" ? "red" : "black")} // Conditional link color
  linkWidth={(link) => (link.strength ? link.strength : 2)} // Dynamic link width
  linkDirectionalArrowLength={5}
  linkDirectionalArrowRelPos={1}
  linkCurvature={0.2} // Curved links for better readability
  nodeRelSize={6} // Base node size
  nodeAutoColorBy="group"
  linkDirectionalParticles={2}
  linkDirectionalParticleSpeed={0.003}
  enableNodeDrag={true}
  nodeCanvasObject={(node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 13 / globalScale; // Adjust size based on zoom

    // Set node color based on group, with same color for leaf nodes
    const groupColors = {
      1: "#ff7f0e", // Orange for group 1
      2: "#1f77b4", // Blue for group 2
      3: "#2ca02c", // Green for group 3
      4: "#d62728", // Red for group 4
      5: "#9467bd", // Purple for group 5
      6: "#8c564b", // Brown for group 6
      7: "#e377c2", // Pink for group 7
      8: "#7f7f7f", // Grey for group 8
      9: "#bcbd22", // Olive for group 9
      10: "#17becf", // Teal for group 10
    };

    const nodeColor = groupColors[node.group] || "black"; // Default to black

    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false); // Circle node
    ctx.fillStyle = nodeColor;
    ctx.fill();

    // Set text to black and position it inside the node
    ctx.font = `bold ${fontSize}px Sans-Serif`; // Make the font bold
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(label, node.x, node.y); // Position label inside the node
  }}
  nodeCanvasObjectMode={() => "after"}
  width={window.innerWidth - 1000}
  height={1000}
  style={{ backgroundColor: "black" }} // Set background color
/>



          </Box>
        </Center>
      </Box>

      {/* Footer Section */}
      <Box bg="gray.900" color="white" py="20" mt="20">
        <Center>
          <Text fontSize="2xl" fontWeight="bold">
            Footer Section
          </Text>
        </Center>
        <Center mt="4">
          <Text fontSize="lg">
            &copy; 2024 Syed Wali | All Rights Reserved.
          </Text>
        </Center>
        <Center mt="4">
          <Text fontSize="md" color="gray.400">
            Follow me on: LinkedIn | GitHub | Twitter
          </Text>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default App;
