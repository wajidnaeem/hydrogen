import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { RichText } from "../components/RichText";
import { Hero } from "../components/Hero";

import { Box, Grid, Image, Text } from "@chakra-ui/react";

const AllCollections = () => {
  const { fetchAllCollections, collection } = useContext(ShopContext);

  useEffect(() => {
    fetchAllCollections();
    return () => {};
  }, [fetchAllCollections]);

  // console.log("fetchAllCollections::  ", fetchAllCollections);
  console.log("collections::  ", collection);

  if (!collection) return <div>Loading....</div>;

  return (
    <Box>
      {/* <Hero /> */}
      <RichText
        heading="The relaxation you’ve been waiting for."
        text="Our Bath bombs guarantee a fun, relaxing, and colorful night."
      />
      <Grid templateColumns={["repeat(1fr)", "repeat(3, 1fr)"]}>
        {collection.map((collection) => (
          <Link to={`/collection/${collection.id}`} key={collection.id}>
            <Box
              boxSize="sm"
              border="1px"
              borderColor="gray.200"
              _hover={{ opacity: "80%" }}
              textAlign="center"
              position="relative"
            >
              <Image src={collection.image.src} />
              <Text fontWeight="bold" position="absolute" bottom="15%" w="100%">
                {collection.title}
              </Text>
              <Text color="gray.500" position="absolute" bottom="5%" w="100%">
                ${collection.description}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
      <RichText heading="Treat yourself!" />
    </Box>
  );
};

export { AllCollections };
