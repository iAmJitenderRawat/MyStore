import { Button, Flex, Grid, Select, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export function SubNav() {
      const [categories, setCategories] = useState([]);
        const bg = useColorModeValue("blue.500", "gray.700");
        const color = useColorModeValue("white", "white");
      useEffect(() => {
        axios
          .get("https://fakestoreapi.com/products/categories")
          .then((res) => setCategories(res.data));
      }, []);
      const [sortPrice, setSortPrice] = useState("");
      const handlePrice = (e) => {
        setSortPrice(e.target.value);
      };
      console.log(sortPrice);
  return (
    <>
      <Grid
        templateColumns={{
          xl: "repeat(4, 1fr)",
          lg: "repeat(4, 1fr)",
          md: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
        }}
        gap={5}
        p={5}
      >
        {categories?.map((items, i) => {
          return (
            <Button as={"span"} key={i} bg={bg} color={color}>
              <Link to={`/category/${items}`}>{items}</Link>
            </Button>
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
          <Select
            placeholder="Select option"
            sortPrice={sortPrice}
            onChange={handlePrice}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Flex>
      </Flex>
    </>
  );
}
