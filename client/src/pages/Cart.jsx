import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyCart } from "./EmptyCart";

export const Cart = () => {
    const cart=JSON.parse(localStorage.getItem("cartLS"))||[];
  const toast = useToast();
  const handleRemove = (productId) => {
    toast({
      title: "Item removed",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };


  return (
    <Box w={"95%"} m={"auto"}>
      <Stack p={2}>
        {cart.length > 0 ? (
          <Box className="right">
            <Heading>Cart Items</Heading>
            <Grid templateColumns={"repeat(3,1fr)"} p={5} gap={10}>
              {cart.map((product) => {
                return (
                  <GridItem
                    key={product.id}
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    borderRadius={10}
                    p={5}
                  >
                    <Image
                    p={8}
                      className="image"
                      src={product.image}
                      alt={product.title}
                    />
                    <Heading fontSize="md">Title: {product.title}</Heading>
                    <Heading fontSize={"md"}>
                      Price: $ { product.price}
                    </Heading>
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex>
                        <Button
                          bg={"blue.400"}
                        >
                          -
                        </Button>
                        <Text p={"5px"}>1</Text>
                        <Button
                          bg={"blue.400"}
                        >
                          +
                        </Button>
                      </Flex>
                      <Button
                        bg={"red.400"}
                        onClick={() => handleRemove(product.id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </GridItem>
                );
              })}
            </Grid>
            <Box m={"20px 0"} p={"50px"}>
              <Box className={"itemCard"}>
                <TableContainer p={"30px"} borderRadius={"20px"}>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Qty</Th>
                        <Th isNumeric>Price</Th>
                      </Tr>
                    </Thead>
                    {cart.map((product) => {
                      return (
                        <Tbody key={product.id}>
                          <Tr>
                            <Td>{product.title}</Td>
                            <Td>
                              {/* <Flex align={"center"}> */}
                              {/* <Button onClick={() => handleQty(1)}>+</Button> */}
                              <Text p={"5px"}>1</Text>
                              {/* <Button onClick={() => handleQty(-1)}>-</Button> */}
                              {/* </Flex> */}
                            </Td>
                            <Td isNumeric>$ { product.price}</Td>
                          </Tr>
                        </Tbody>
                      );
                    })}
                  </Table>
                </TableContainer>
                <Flex justify={"flex-end"} p={"30px"}>
                  <Heading mr={"30px"}>Grand Total:</Heading>
                  <Heading>
                    ${" "}
                    {cart.reduce((acc, ele) => {
                      return acc + ele.price;
                    }, 0)}
                  </Heading>
                </Flex>
              </Box>
            </Box>
          </Box>
        ) : (
          <EmptyCart />
        )}
      </Stack>
    </Box>
  );
};
