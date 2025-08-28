import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROGRAM } from "../apollo/Query";
import { client } from "../apollo/apolloClient";

export async function getProgram({ params }) {
  const programId = parseInt(params.id);
  try {
    const { data } = await client.query({
      query: GET_PROGRAM,
      variables: {
        programId: programId,
      },
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    throw new Response("Failed to load program ", { status: 500 });
  }
}
