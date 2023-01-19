import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { AiTwotoneHome, AiOutlineCreditCard } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../slice/cartSlice";

export function Checkout() {
  const Cartproducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast();
  const total = Cartproducts.reduce((acc, ele) => {
    return acc + ele.price;
  }, 0);
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
      dispatch(reset());
    }, 2000);
  };
  console.log(Cartproducts);
  return (
    <Box p={5}>
      <Heading textAlign={"center"}>Checkout</Heading>
      <Box p={5}>
        <Flex
          justify={"space-between"}
          flexDir={{ xl: "row", lg: "row", md: "column", sm: "column" }}
        >
          <FormControl w={{ xl: "49%", lg: "49%", md: "100%", sm: "100%" }}>
            <Flex flexDirection={"column"} gap={5}>
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
          </FormControl>
          {/* <Divider orientation="vertical" w={"1%"} variant="solid" h={"full"} color={"red.900"} /> */}
          <Box p={5} w={{ xl: "49%", lg: "49%", md: "100%", sm: "100%" }}>
            <Heading textAlign={"center"}>Order Summary</Heading>
            {Cartproducts
              ? Cartproducts?.map((item) => {
                  return (
                    <Box>
                      <Flex key={item.id} p={5} gap={5}>
                        <Image src={item.thumbnail} w={100} />
                        <Box>
                          <Text>{item.title}</Text>
                          <Text>$ {item.price}</Text>
                        </Box>
                      </Flex>
                      <Divider orientation="horizontal" />
                    </Box>
                  );
                })
              : null}
            <Heading>
              {Cartproducts.length > 0 ? "Total: $" + " " + total : null}
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
