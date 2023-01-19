import {
  Box,
  Button,
  Flex,
  Grid,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../slice/categogiesSlice";

export function SubNav() {
  const categories = useSelector((state) => state.category.data);
  const dispatch = useDispatch();
  const bg = useColorModeValue("blue.500", "gray.700");
  const color = useColorModeValue("white", "white");
  console.log(categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Grid
        templateColumns={{
          "2xl": "repeat(9, 1fr)",
          xl: "repeat(8, 1fr)",
          lg: "repeat(6, 1fr)",
          md: "repeat(4, 1fr)",
          sm: "repeat(3, 1fr)",
          base: "repeat(2, 1fr)",
        }}
        justify={"space-between"}
        gap={5}
        p={5}
      >
        {categories?.map((items, i) => {
          return (
            <Box key={i}>
              <Link to={`/category/${items}`}>
                <Button bg={bg} color={color} w={"100%"}>
                  {items}
                </Button>
              </Link>
            </Box>
          );
        })}
      </Grid>
      <Flex justify={"space-evenly"}>
        <Flex align={"center"}>
          <Text>Sort By Name</Text>
          <Select placeholder="Select option">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
        <Flex align={"center"}>
          <Text>Sort By Price</Text>
          <Select placeholder="Select option">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
      </Flex>
    </>
  );
}
