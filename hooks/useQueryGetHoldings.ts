import axios from "axios";
import { QueryKey } from "../const/query.constants";
import { Url } from "../const/urls.constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const useQueryGetHoldings = () => {
  const query = useQuery({
    queryKey: [QueryKey.GetHoldings],
    queryFn: async ({ signal }) => {
      const response = await axios.get<{ symbol: string }[]>(
        Url.GetHoldings(),
        {
          signal,
        }
      );
      return response.data;
    },
  });

  return query;
};
