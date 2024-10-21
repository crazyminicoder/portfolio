import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import aiLogo from "./images/ailogo.png"; // Import the AI logo
import mainLogo from "./images/mylogo.png"; // Import the main logo

// Spectrum Colors Array
const spectrumColors = [
  "#FF0000", "#FF4500", "#FF7F00", "#FFD700", "#ADFF2F", "#32CD32", 
  "#00FF00", "#00FA9A", "#00FFFF", "#1E90FF", "#0000FF", "#8A2BE2",
];

// Custom font style
const customFont = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "bold",
  fontSize: "lg",
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState(null);

  // Handle scroll behavior
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Navbar links with spectrum colors
  const navLinks = [
    { label: "Home", href: "#home", color: spectrumColors[0] },
    { label: "About", href: "#about", color: spectrumColors[2] },
    { label: "Projects", href: "#projects", color: spectrumColors[4] },
    { label: "Skills", href: "#skills", color: spectrumColors[6] },
    { label: "Blog", href: "#blog", color: spectrumColors[8] },
    { label: "AI Tools", href: "#ai-tools", color: spectrumColors[11] },
  ];

  return (
    <>
      {/* Frosty Navbar */}
      <Flex
        as="nav"
        position="fixed"
        top="0"
        left="0"
        right="0"
        h="60px"
        alignItems="center"
        justifyContent="center"
        px="4"
        bg="rgba(0, 0, 0)" // Black shade with 0.7 transparency
        backdropFilter="blur(10px)" // Frosted glass effect
        zIndex="1000"
        boxShadow="sm"
        transition="transform 0.3s ease"
        transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
      >
        {/* Logo */}
        <Box position="absolute" left="8">
          <Image
            src={mainLogo}
            alt="Logo"
            h="40px"
          />
        </Box>

        {/* Center Links with Spectrum Hover Effect */}
        <Flex gap="10" alignItems="center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              fontSize="lg"
              fontWeight="bold"
              color={activeLink === link.label ? link.color : "white"} // Active link color
              _hover={{
                color: link.color,
                textDecoration: "none", // Removes underline on hover
              }}
              transition="color 0.3s ease" // Smooth color transition
              onClick={() => setActiveLink(link.label)} // Set active link
            >
              {link.label}
            </Link>
          ))}

          {/* AI Assistant Logo next to links */}
          <IconButton
            aria-label="Open AI Assistant"
            size="lg"
            variant="unstyled"
            onClick={isOpen ? onClose : onOpen}
            ml="4"
            icon={
              <Image
                src={aiLogo}
                alt="AI Assistant"
                boxSize="30px"
              />
            }
          />
        </Flex>
      </Flex>

      {/* Chat Window (Bottom-right) */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          w="300px"
          h="400px"
          bg="black"
          boxShadow="lg"
          borderRadius="md"
          p="4"
          zIndex="1001"
        >
          <Flex justifyContent="flex-end">
            <IconButton
              icon={
                <Image
                  src={aiLogo}
                  alt="Close AI Assistant"
                />
              }
              aria-label="Close AI Assistant"
              size="sm"
              onClick={onClose}
            />
          </Flex>
          <Box h="100%" mt="2">
            <p>AI Assistant Chat Here...</p>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar;
