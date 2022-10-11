import { GetStaticProps } from "next";
import { Cloth, getAllProducts } from "../lib/graphql";
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  products: Cloth[];
};

const ProductPage = ({ products }: Props) => {
  return (
    <Grid templateColumns="repeat(3, minmax(250px, 1fr) )" gap={4} m={2}>
      {products &&
        products.map((product) => (
          <GridItem w="100%" h="250" key={product.slug}>
            <Link href={`/product/${product.slug}`}>
              <Image
                src={product.image[0].url}
                alt={product.name}
                height={product.image[0].height}
              />
              <Heading as="h2" size="md">
                {product.name}
              </Heading>
            </Link>
          </GridItem>
        ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
};

export default ProductPage;
