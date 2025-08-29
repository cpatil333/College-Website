import { client } from "../apollo/apolloClient";
import { GET_EVENTS } from "../apollo/Query";

export async function getEvents() {
  try {
    const { data } = await client.query({
      query: GET_EVENTS,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data error ", { status: 500 });
  }
}
