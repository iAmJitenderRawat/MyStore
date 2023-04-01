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
  Button,
  Text,
  Select,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SubNav } from "../components/SubNav";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesProducts, STATUSES } from "../slice/categoryProductsSlice";
import { Rating } from "../components/Rating";
import { useCart } from "react-use-cart";

export function Category() {
  const { addItem } = useCart();
  const {data: products, status} = useSelector((state) => state.categoryProducts);
  const { page } = useParams();
  console.log(page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesProducts(page));
  }, [dispatch, page]);

  console.log(products);
const toast = useToast();
  const handleAddToCart = (data) => {
    addItem(data);
    toast({
      title: "Item added",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

    if (status === STATUSES.LOADING) {
      return (
        <Flex justifyContent={"center"} m={"300px 0"}>
          <Heading textAlign={"center"}>
            <Spinner />
            Loading....
          </Heading>
        </Flex>
      );
    }

    if (status === STATUSES.ERROR) {
      return (
        <Box>
          <Heading>ERROR 404</Heading>
          <Heading>Something went wrong!</Heading>
        </Box>
      );
    }

  return (
    <>
      <SubNav />
      <Center w={"95%"} m={"20px auto"}>
        <Grid
          templateColumns={{
            xl: "repeat(4, 1fr)",
            lg: "repeat(3, 1fr)",
            md: "repeat(2, 1fr)",
            sm: "repeat(1, 1fr)",
          }}
          gap={5}
        >
          {products?.map((data) => {
            return (
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
                <Link to={`/products/${data.id}`}>
                  <Center p={8}>
                    <Image
                      className="image"
                      src={data.thumbnail}
                      alt={`Picture of ${data.title}`}
                      roundedTop="lg"
                    />
                  </Center>
                </Link>

                <Box p="6">
                  <Box
                    d="flex"
                    alignItems="baseline"
                  >
                    <Badge
                      position="absolute"
                      top={1}
                      left={1}
                      rounded="full"
                      px="2"
                      fontSize="0.8em"
                      colorScheme="red"
                    >
                      {data.discountPercentage}% OFF
                    </Badge>
                  </Box>

                  <Box
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                  >
                    {data.title}
                  </Box>

                  <Flex justifyContent="space-between" alignContent="center">
                    <Rating
                      rating={data.rating}
                      numReviews={data.stock}
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
                      <chakra.a display={"flex"}>
                        <Button
                          mt={5}
                          bg={"red.400"}
                          onClick={() => handleAddToCart(data)}
                        >
                          <Icon
                            as={FiShoppingCart}
                            h={7}
                            w={7}
                            // alignSelf={"center"}
                          />{" "}
                          Add To Cart
                        </Button>
                      </chakra.a>
                    </Tooltip>
                  </Center>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Center>
    </>
  );
}
