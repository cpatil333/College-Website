import React from "react";
import { client } from "../apollo/apolloClient";
import { GET_COURSES } from "../apollo/Query";

export async function getCourses() {
  try {
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Fetching data load error ", { status: 500 });
  }
}
