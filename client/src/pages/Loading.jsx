import { Box, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import React from 'react'

export function Loading() {
      const loading=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  return (
    <Box w={"95%"} m={"20px auto"}>
      <Grid templateColumns="repeat(4, 1fr)" gap={5}>
        {loading.map((item, i) => {
          return (
            <GridItem key={i}>
              <Box m={5}>
                <Skeleton w={"300px"} h={"300px"} />
              </Box>
              <Box m={5}>
                <Skeleton w={"300px"} />
                <Skeleton w={"300px"} />
                <Skeleton w={"300px"} />
                <Skeleton w={"300px"} />
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
