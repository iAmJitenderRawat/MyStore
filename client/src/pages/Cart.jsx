import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
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
import React from "react";
import { Link } from "react-router-dom";
import { EmptyCart } from "./EmptyCart";
import { useCart } from "react-use-cart";

export const Cart = () => {
   const {
     isEmpty,
     cartTotal,
     totalUniqueItems,
     items,
     updateItemQuantity,
     removeItem,
     emptyCart,
   } = useCart();
   console.log("items",items)
  const toast = useToast();

  const handleRemove = (productId) => {
    removeItem(productId)
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
        {items.length > 0 ? (
          <Box className="right">
            <Heading>Cart Items</Heading>
            <Grid
              templateColumns={{
                xl: "repeat(4, 1fr)",
                lg: "repeat(3, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)",
              }}
              p={5}
              gap={10}
            >
              {items.map((product) => {
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
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <Heading fontSize="md">Title: {product.title}</Heading>
                    <Heading fontSize={"md"}>Price: $ {product.price}</Heading>
                    <Flex justify={"space-between"} align={"center"}>
                      <Flex>
                        <Button
                          bg={"blue.400"}
                          onClick={() =>
                            updateItemQuantity(product.id, product.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <Text p={"5px"}>{product.quantity}</Text>
                        <Button
                          bg={"blue.400"}
                          onClick={() =>
                            updateItemQuantity(product.id, product.quantity + 1)
                          }
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
                    {items.map((product) => {
                      return (
                        <Tbody key={product.id}>
                          <Tr>
                            <Td>{product.title}</Td>
                            <Td>
                              <Text p={"5px"}>{product.quantity}</Text>
                            </Td>
                            <Td isNumeric>
                              $ {product.quantity * product.price}
                            </Td>
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
                    {cartTotal}
                  </Heading>
                </Flex>
                <Link to={"/checkout"}>
                  <Button bg={"green.400"} color={"white"}>
                    Checkout
                  </Button>
                </Link>
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
