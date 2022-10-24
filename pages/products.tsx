import { GetStaticProps } from "next";
import { Cloth, getAllProducts, GetAllProductsProps } from "../lib/graphql";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";


const ProductPage = ({ data, error}: GetAllProductsProps) => {
  return (
    <Grid templateColumns="repeat(3, minmax(250px, 1fr) )" gap={4} m={2}>
      {data &&
        data.map((product) => (
          <GridItem w="100%" h="250" key={product.slug}>
            <Link href={`/product/${product.slug}`}>
              <Box>
                <Image
                  src={product.image[0].url}
                  alt={product.name}
                  width="200px"
                  height="200px"
                />
                <Heading as="h2" size="md">
                  {product.name}
                </Heading>
              </Box>
            </Link>
          </GridItem>
        ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getAllProducts();

  return {
    props: {
      ...products
    }
  }
};

export default ProductPage;
