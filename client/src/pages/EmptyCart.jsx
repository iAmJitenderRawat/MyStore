import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export function EmptyCart() {
  return (
    <Box w={"90%"} m={"auto"}>
      <VStack>
        <Box p={8}>
          <AiOutlineShoppingCart size={"300px"} />
        </Box>
        <Heading h={"30vh"}>Your cart is currently empty.</Heading>
      </VStack>
    </Box>
  );
}
