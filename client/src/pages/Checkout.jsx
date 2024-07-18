import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneHome, AiOutlineCreditCard } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

export function Checkout() {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
  } = useCart();

  const navigate=useNavigate();
  const toast = useToast();
  const handlePay = () => {
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Order Placed",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      emptyCart();
    }, 2000);
    setTimeout(()=>{
      navigate("/");
    },3000)
  };
  
  return (
    <Box p={5}>
      <Heading textAlign={"center"}>Checkout</Heading>
      <Box p={5}>
        <Flex
          justify={"space-between"}
          flexDir={{ xl: "row", lg: "row", md: "column", sm: "column" }}
        >
          <FormControl w={{ xl: "49%", lg: "49%", md: "100%", sm: "100%" }}>
            <Heading textAlign={"center"}>Card & User Deails</Heading>
            <Flex flexDirection={"column"} gap={5} p={5}>
              <Flex gap={5}>
                <InputGroup>
                  <InputLeftElement children={<AiOutlineCreditCard />} />
                  <Input placeholder={"Card Number"} />
                </InputGroup>
                <InputGroup>
                  <Input placeholder={"Valid Till"} />
                  <InputRightAddon children={"MM/YY"} />
                </InputGroup>
              </Flex>
              <InputGroup>
                <InputLeftElement children={<AiTwotoneHome />} />
                <Input placeholder={"Street Address"} />
              </InputGroup>
              <Input placeholder={"Apt, unit, suite, etc. (optional)"} />
              <Input placeholder="Country" />
              <Flex gap={5}>
                <Input placeholder="City" w={"60%"} />
                <Input placeholder={"State"} w={"25%"} />
                <Input placeholder={"Zip Code"} w={"15%"} />
              </Flex>
            </Flex>
            <Link to={"/cart"}>
              <Button m={"5"} bg={"red.400"} color={"white"}>
                ← Back
              </Button>
            </Link>
          </FormControl>
          {/* <Divider orientation="vertical" w={"1%"} variant="solid" h={"full"} color={"red.900"} /> */}
          <Box  w={{ xl: "49%", lg: "49%", md: "100%", sm: "100%" }}>
            <Heading textAlign={"center"}>Order Summary</Heading>
            {items
              ? items?.map((item) => {
                  return (
                    <Box>
                      <Flex key={item.id} p={5} gap={5}>
                        <Image src={item.thumbnail} w={100} />
                        <Box>
                          <Text>{item.title}</Text>
                          <Text>
                            {item.quantity} {"* $ "} {item.price} {"= $"}{" "}
                            {item.quantity * item.price}
                          </Text>
                        </Box>
                      </Flex>
                      <Divider orientation="horizontal" />
                    </Box>
                  );
                })
              : null}
            <Heading>
              {items.length > 0 ? "Total: $" + " " + cartTotal : null}
            </Heading>
            <Center p={5}>
              <Button
                bg={"green.400"}
                w={"full"}
                color={"white"}
                onClick={handlePay}
              >
                Pay
              </Button>
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
