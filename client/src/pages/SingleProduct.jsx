import {
  Box,
  Divider,
  Heading,
  Flex,
  Stack,
  Card,
  CardBody,
  Image,
  Text,
  CardFooter,
  Button,
  Center,
  useToast,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSingleProducts,
  STATUSES,
} from "../slice/singleProductSlice";
import { add } from "../slice/cartSlice";
import { Rating } from "../components/Rating";

export function SingleProduct() {
  const categories = useSelector((state) => state.category);
  const { data: product, status } = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const toast = useToast();

  let { id } = useParams();
  console.log(id);


  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  const handleAdd = (product) => {
    dispatch(add(product));
    toast({
      title: "Added to cart",
      position: "bottom-left",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  // console.log(categories)

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return (
      <div>
        <h1>ERROR 404</h1>
        <h2>Something went wrong!</h2>
      </div>
    );
  }
  return (
    <Box p={5}>
      <Card>
        <CardBody>
          <Badge
            position="absolute"
            top={2}
            right={2}
            rounded="full"
            px="2"
            fontSize="1em"
            colorScheme="red"
          >
            {product.discountPercentage}% OFF
          </Badge>
          <Flex justify={"space-between"} p={"10px"} gap={5}>
            <Box>
              <Image
                src={product.thumbnail}
                alt={product.title}
                borderRadius="lg"
                w={"300px"}
                h={"300px"}
              />
            </Box>
            <Stack>
              <Heading size="lg">Brand: {product.brand}</Heading>
              <Text fontSize={"xl"}>
                <Heading as={"h4"} fontSize={"xl"} display={"inline-block"}>
                  Title:
                </Heading>{" "}
                {product.title}
              </Text>
              <Text fontSize={"xl"}>
                <Heading as={"h4"} fontSize={"xl"} display={"inline-block"}>
                  Description:
                </Heading>{" "}
                {product.description}
              </Text>
              <Flex justify={"space-between"}>
                <Text fontSize="xl">Price: ₹ {70 * product.price}</Text>
                <Flex gap={2}>
                  <Text fontSize="xl">Rating:</Text>
                  <Rating rating={product.rating} />
                </Flex>
              </Flex>
              <Center>
                <Text fontSize="xl">
                  {product.stock > 0 ? (
                    <Text>In Stock</Text>
                  ) : (
                    <Text>Out of Stock</Text>
                  )}
                </Text>
              </Center>
            </Stack>
          </Flex>
          <Box p={"10px"}>
            <Flex gap={5}>
              {product?.images?.map((item) => {
                return (
                  <Image
                    className="zoom"
                    src={item}
                    w={"150px"}
                    h={"150px"}
                    borderRadius={5}
                  />
                );
              })}
            </Flex>
          </Box>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            onClick={() => handleAdd(product)}
            variant="solid"
            colorScheme="blue"
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}