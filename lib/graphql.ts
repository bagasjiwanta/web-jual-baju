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

export async function getAllProducts(): Promise<Cloth[]> {
  const query = gql`
    query Assets {
      clothes {
        id
        image {
          url
          height
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
    return response?.data.clothes;
  } catch (err) {
    console.log(err);
    return [];
  }
}
