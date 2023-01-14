import React from "react";
import {
  Box,
  Grid,
  Circle,
  Image,
  Flex,
  Tooltip,
  Badge,
  chakra,
  Icon,
  GridItem,
  useColorModeValue,
  Center,
  Spinner,
  Button,
  Heading,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SubNav } from "../components/SubNav";
import { Link } from "react-router-dom";
// import { Loading } from "./Loading";

function Rating({ rating, numReviews }) {
  return (
    <Flex alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Flex>
  );
}

export function Home() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    await axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SubNav />
      <Box w={"95%"} m={"20px auto"}>
        <Grid
          templateColumns={{
            xl: "repeat(4, 1fr)",
            lg: "repeat(3, 1fr)",
            md: "repeat(2, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
          gap={5}
        >
          {products ? (
            products.map((data) => {
              return (
                <Link to={`/products/${data.id}`}>
                  <GridItem
                    key={data.id}
                    bg={useColorModeValue("white", "gray.800")}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                    position="relative"
                  >
                    {true && (
                      <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                      />
                    )}

                    <Center p={8}>
                      <Image
                        className="image"
                        src={data.image}
                        alt={`Picture of ${data.title}`}
                        roundedTop="lg"
                      />
                    </Center>

                    <Box p="6">
                      <Box
                        d="flex"
                        alignItems="baseline"
                        position="absolute"
                        top={1}
                        left={1}
                      >
                        {data.rating.count < 220 && (
                          <Badge
                            zIndex={1}
                            rounded="full"
                            px="2"
                            fontSize="0.8em"
                            colorScheme="red"
                          >
                            New
                          </Badge>
                        )}
                      </Box>

                      <Box
                        fontSize="2xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                      >
                        {data.title.slice(0, 20)}...
                      </Box>

                      <Flex
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Rating
                          rating={data.rating.rate}
                          numReviews={data.rating.count}
                        />
                        <Box
                          fontSize="2xl"
                          color={useColorModeValue("gray.800", "white")}
                        >
                          <Box as="span" color={"gray.600"} fontSize="lg">
                            $
                          </Box>
                          {data.price.toFixed(2)}
                        </Box>
                      </Flex>
                      <Center>
                        <Tooltip
                          label="Add to cart"
                          bg="white"
                          placement={"top"}
                          color={"gray.800"}
                          fontSize={"1.2em"}
                        >
                          <chakra.a href={"#"} display={"flex"}>
                            <Button mt={5} bg={"red.400"}>
                              <Icon as={FiShoppingCart} h={7} w={7} /> Add To
                              Cart
                            </Button>
                          </chakra.a>
                        </Tooltip>
                      </Center>
                    </Box>
                  </GridItem>
                </Link>
              );
            })
          ) : (
            <Center>
              <Spinner />
              <Heading>Loading...</Heading>
            </Center>
          )}
        </Grid>
      </Box>
    </>
  );
}
