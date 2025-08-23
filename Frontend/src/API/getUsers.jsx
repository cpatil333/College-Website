import { GET_USERS } from "../apollo/Query";
import { client } from "../apollo/apolloClient";

export async function getUsers() {
  try {
    const { data } = await client.query({
      query: GET_USERS,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Failed to load users", { status: 500 });
  }
}
