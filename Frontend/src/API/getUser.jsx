import { GET_USER } from "../apollo/Query";
import { client } from "../apollo/apolloClient";

export async function getUser({ params }) {
  const userId = params.id;
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        userId: userId,
      },
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Failed to load users", { status: 500 });
  }
}
