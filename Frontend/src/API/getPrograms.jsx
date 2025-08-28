import { client } from "../apollo/apolloClient";
import { GET_PROGRAMS } from "../apollo/Query";

export async function getPrograms() {
  try {
    const { data } = await client.query({
      query: GET_PROGRAMS,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Failed to load programs data ", { status: 500 });
  }
}
