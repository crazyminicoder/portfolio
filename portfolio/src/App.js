import React, { useState, useEffect, useRef } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Image,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Flipper from "./Flipper";
import Navbar from "./Navbar";
import { ForceGraph2D } from "react-force-graph";
import SliderCarousel from "react-slick";
import { Link as ScrollLink, Element } from 'react-scroll';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { fetchProjects } from './api';

import projectImage1 from './images/w1.jpg';
import projectImage2 from './images/w1.png';
import projectImage3 from './images/w2.png';
import projectImage4 from './images/w3.png';

const imageMapping = {
  projectImage1: projectImage1,
  projectImage2: projectImage2,
  projectImage3: projectImage3,
  projectImage4: projectImage4,
};

// Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  draggable: true,
  swipeToSlide: true,
  centerMode: true,
  centerPadding: "20px",
};

// Mock data for contributions
const generateRandomContributions = (startDate, endDate) => {
  const contributions = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const count = Math.floor(Math.random() * 10);
    contributions.push({ date: dateStr, count });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return contributions;
};

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-10-23');
const mockContributions = generateRandomContributions(startDate, endDate);

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
  const [zoomLevel, setZoomLevel] = useState(2.1);
  const graphRef = useRef();
  const [projects, setProjects] = useState([]);
  const [skillsData, setSkillsData] = useState({ nodes: [], links: [] });

  // Fetch projects from the backend
  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        console.log('Fetched projects:', data); // Debugging
        setProjects(data);
      } catch (error) {
        console.error('Error in fetching projects:', error);
      }
    };
    getProjects();
  }, []);

  // Fetch skills data from the backend
  useEffect(() => {
    const getSkillsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/skillsdata');
        const data = await response.json();
        console.log('Fetched skillsData:', data); // Debugging

        if (data && data.nodes && data.links) {
          setSkillsData({ nodes: data.nodes, links: data.links });
        }
      } catch (error) {
        console.error('Error in fetching skillsData:', error);
      }
    };
    getSkillsData();
  }, []);

  // Callback function to update description when flipper changes
  const handleFlipperChange = (index) => {
    setCurrentDescription(descriptions[index]);
    setTimeout(() => setShowDescription(true), 300);
  };

  // Set initial zoom and centering of the graph
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.zoom(zoomLevel);
      graphRef.current.centerAt(0, 0, 500);
    }
  }, [zoomLevel]);

  // Handle zoom slider change
  const handleZoomChange = (value) => {
    setZoomLevel(value);
    if (graphRef.current) {
      graphRef.current.zoom(value);
    }
  };

  return (
    <ChakraProvider>
      {/* Navbar with links for scrolling */}
      <Navbar>
        <ScrollLink to="main-section" smooth={true} duration={500} className="nav-link">
          Home
        </ScrollLink>
        <ScrollLink to="projects-section" smooth={true} duration={500} className="nav-link">
          Projects
        </ScrollLink>
        <ScrollLink to="skills-section" smooth={true} duration={500} className="nav-link">
          Skills
        </ScrollLink>
        <ScrollLink to="contributions-section" smooth={true} duration={500} className="nav-link">
          Contributions
        </ScrollLink>
      </Navbar>

      {/* Main Section */}
      <Element name="main-section">
        <Flex h="100vh" mt="60px" bg="#1A1A1A">
          <Box flex="1" display="flex" alignItems="center" justifyContent="center" bg="#1A1A1A" width="50%" height="100%">
            <Text fontSize="4xl" fontWeight="bold" color="white">
              Left Section
            </Text>
          </Box>
          <Box flex="1" display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="#1A1A1A" width="50%" height="100%">
            <Text fontSize="4xl" fontWeight="semibold" color="rgba(220, 220, 220, 0.8)" mb="1">
              I AM
            </Text>
            <Text fontSize="5xl" fontWeight="bold" color="white" mb="1">
              SYED WALI
            </Text>
            <Box mt="1" mb="1">
              <Flipper words={words} onFlipperStateChange={handleFlipperChange} />
            </Box>
            <Text fontSize="lg" color="gray.300" textAlign="center" mt="1" transition="opacity 2s ease-in" opacity={showDescription ? 1 : 0} display={showDescription ? "block" : "none"}>
              {currentDescription}
            </Text>
          </Box>
        </Flex>
      </Element>

      {/* Projects Section */}
      <Element name="projects-section">
        <Box bg="#121212" color="white" py="25" px="3" height="55dvh">
          <Flex justifyContent="center" mb="8">
            <Text fontSize="6xl" fontWeight="bold" color="#FFFDD0" pb="15">
              Projects
            </Text>
          </Flex>

          {projects.length > 0 ? (
            <SliderCarousel {...carouselSettings}>
              {projects.map((project, index) => (
                <Box key={index} bg="gray.800" borderRadius="md" overflow="hidden" w="80%" mx="4" cursor="pointer" position="relative" height="262px" _hover={{ height: "450px" }} display="flex" flexDirection="column" transition="height 0.4s ease">
                  <Image src={imageMapping[project.imageUrl]} alt={project.title} w="100%" h="200px" objectFit="cover" borderTopRadius="md" />
                  <Flex p="4" justifyContent="center" alignItems="center" bg="gray.900">
                    <Text fontSize="xl" fontWeight="bold" color="white">
                      {project.title}
                    </Text>
                  </Flex>
                  <Text fontSize="md" mb="2" textAlign="center" color="white" py="25">
                    {project.description}
                  </Text>
                  <Flex gap="2" mt="2" wrap="wrap" justifyContent="center" pb="25">
                    {project.technologies.map((tech, idx) => (
                      <Box key={idx} p="1" bg="gray.600" borderRadius="md" fontSize="sm" color="white">
                        {tech}
                      </Box>
                    ))}
                  </Flex>
                </Box>
              ))}
            </SliderCarousel>
          ) : (
            <Center>
              <Text fontSize="2xl" color="gray.400">No projects available</Text>
            </Center>
          )}
        </Box>
      </Element>

      {/* Skills Section */}
      <Element name="skills-section">
        <Box bg="#EDEADE" color="black" py="20" px="10" height="100vh">
          <Flex justifyContent="center" mb="8">
            <Text fontSize="6xl" fontWeight="bold">
              Skills
            </Text>
          </Flex>
          <Center mb="8">
            <Box width="50%">
              <Text fontSize="md" mb="4" textAlign="center">
                Zoom Level: {zoomLevel.toFixed(1)}
              </Text>
              <Slider
                aria-label="zoom-slider"
                defaultValue={2.1}
                min={0.5}
                max={3}
                step={0.1}
                value={zoomLevel}
                onChange={handleZoomChange}
              >
                <SliderTrack bg="gray.300">
                  <SliderFilledTrack bg="#979dac" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="black" />
                </SliderThumb>
              </Slider>
            </Box>
          </Center>

          {/* ForceGraph2D Component */}
          <Center>
            <Box width="100%" height="75vh" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
              <ForceGraph2D
                ref={graphRef}
                graphData={skillsData}
                nodeLabel={(node) => `${node.id}`}
                linkColor={() => "black"}
                linkWidth={() => 2}
                linkDirectionalArrowLength={5}
                linkDirectionalArrowRelPos={1}
                linkCurvature={0.2}
                nodeRelSize={6}
                nodeAutoColorBy="group"
                linkDirectionalParticles={2}
                linkDirectionalParticleSpeed={0.003}
                enableNodeDrag={true}
                enableZoomInteraction={false}
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.id;
                  const fontSize = 13 / globalScale;
                  const groupColors = {
                    1: "#db7c26",
                    2: "#0077b6",
                    3: "#6a994e",
                    4: "#c32f27",
                    5: "#9b5de5",
                    6: "#52b788",
                    7: "#f15bb5",
                    8: "#a9abb5",
                    9: "#ffca3a",
                    10: "#17becf",
                    11: "#a1cca5",
                  };
                  const nodeColor = groupColors[node.group] || "black";
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
                  ctx.fillStyle = nodeColor;
                  ctx.fill();
                  ctx.font = `bold ${fontSize}px Sans-Serif`;
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "black";
                  ctx.fillText(label, node.x, node.y);
                }}
                nodeCanvasObjectMode={() => "after"}
                width={window.innerWidth - 1000}
                height={1000}
                style={{ backgroundColor: "white" }}
              />
            </Box>
          </Center>
        </Box>
      </Element>

      {/* Contributions Section */}
      <Element name="contributions-section">
        <Box bg="#1A1A1A" color="white" py="20" px="10" minHeight="50vh">
          <Flex justifyContent="center" mb="8">
            <Text fontSize="6xl" fontWeight="bold">
              Contributions
            </Text>
          </Flex>
          <Center>
            <CalendarHeatmap
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-12-31')}
              values={mockContributions}
              classForValue={(value) => {
                if (!value || value.count === 0) return 'color-empty';
                if (value.count > 0 && value.count <= 2) return 'color-scale-1';
                if (value.count > 2 && value.count <= 4) return 'color-scale-2';
                if (value.count > 4 && value.count <= 7) return 'color-scale-3';
                return 'color-scale-4';
              }}
              tooltipDataAttrs={(value) => ({
                'data-tip': value.date ? `${value.date}: ${value.count} contributions` : 'No contributions',
              })}
              showWeekdayLabels={true}
              transformDayElement={(rect) => {
                const newRect = React.cloneElement(rect, {
                  width: 9,
                  height: 9,
                });
                return newRect;
              }}
            />
          </Center>
        </Box>
      </Element>

      {/* Footer Section */}
      <Element name="about-footer">
        <Box color="white" py="20" mt="20" height="25dvh">
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
      </Element>
    </ChakraProvider>
  );
};

export default App;
