import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export function Footer() {
  const year = new Date().getFullYear();
  const bg = useColorModeValue("blue.500", "gray.700");
  const color = useColorModeValue("white", "white");
  console.log(year);
  
  return (
    <Box bg={bg} color={color}>
      <Center>
        <Text>Made with ❤️ by Jitender</Text>
      </Center>
      <Center>
        <Text>© {year}</Text>
      </Center>
    </Box>
  );
}
