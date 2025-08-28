import React from "react";
import { client } from "../apollo/apolloClient";
import { GET_POST_NOTICES } from "../apollo/Query";

export async function getNotices() {
  try {
    const { data } = await client.query({
      query: GET_POST_NOTICES,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching Post Notice data error ", { status: 500 });
  }
}
