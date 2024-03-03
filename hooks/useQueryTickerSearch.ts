import axios from "axios";
import { QueryKey } from "../const/query.constants";
import {
  YFQuote,
  TickerSearchResponse,
  Quote,
} from "../types/api/ticker-search.types";
import { Url } from "../const/urls.constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { stockExchangeCountries } from "../const/exchangesToCountries.constants";
import { debounce } from "@mui/material";

export const useQueryTickerSearch = () => {
  const [options, setOptions] = useState<Quote[]>([]);
  const [text, setText] = useState("");

  const query = useQuery<Quote[]>({
    enabled: !!text,
    queryKey: [QueryKey.TickerSearch, text],
    queryFn: async () => {
      const response = await axios.get<Quote[]>(Url.TickerSearch(text));
      setOptions(response.data);
      return response.data;
    },
  });

  const getStockExchangeInfoForOption = (option: Quote) =>
    stockExchangeCountries.find(({ exchangeShortName }) =>
      [option.exchangeCode, option.exchangeDisplayName].includes(
        exchangeShortName
      )
    );

  const onChangeSearchText: React.ChangeEventHandler<HTMLInputElement> =
    debounce((e) => setText(e.target.value), 200);

  return {
    query,
    onChangeSearchText,
    options: options.map((option) => ({
      ...option,
      exchangeInfo: getStockExchangeInfoForOption(option),
    })),
  };
};
