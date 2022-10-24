import { request, gql } from "graphql-request";

export type Cloth = {
  id: string;
  image: Image[];
  name: string;
  price: number;
  sizes: string[];
  slug: string;
  description?: string;
};

export type Image = {
  url: string;
  height: number;
};

export type GetAllProductsProps = {
  data: Cloth[] | null;
  error: string | null;
}

export async function getAllProducts(): Promise<GetAllProductsProps> {
  const query = gql`
    query Assets {
      clothes {
        id
        image {
          url
          height
          width
        }
        name
        price
        sizes
        slug
        description
      }
    }
  `;
  try {
    const response = await request(
      process.env.GRAPHQL_API_ENDPOINT ?? "",
      query
    );
    return {
      data: response?.clothes,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: JSON.stringify(err),
    };
  }
}

export async function getProductBySlug(slug: string): Promise<{
  data: Cloth | null;
  error: string | null;
}> {
  const query = gql`
    query MyQuery($slug: String) {
      cloth(where: { slug: $slug }) {
        name
        price
        sizes
        image {
          url
          height
          width
        }
        description
      }
    }
  `;

  const variables = {
    slug: slug
  };
  
  try {
    const response = await request(
      process.env.GRAPHQL_API_ENDPOINT ?? "",
      query,
      variables
    );
    return {
      data: response?.cloth,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: JSON.stringify(err),
    };
  }
}
