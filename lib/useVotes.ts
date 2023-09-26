import React from 'react'
import useSWR from "swr"
import { votes } from "@prisma/client"

export default function useVotes() {
  const fetcher = (url: string) => fetch(url).then((r:any) => r.json());
  const { data, error } = useSWR<Res<votes[]>>("/api/vote", fetcher);

  return {
    data, error, isLoading: !error && ! data
  }
}
