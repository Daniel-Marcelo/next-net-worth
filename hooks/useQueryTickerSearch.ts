import axios from "axios";
import { QueryKey } from "../const/query.constants";
import { Quote, TickerSearchResponse } from "../types/api/ticker-search.types";
import { Url } from "../const/urls.constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { stockExchangeCountries } from "../const/exchangesToCountries.constants";
import { debounce } from "@mui/material";

export const useQueryTickerSearch = () => {
  const [options, setOptions] = useState<Quote[]>([]);
  const [text, setText] = useState("");

  const query = useQuery<TickerSearchResponse>({
    enabled: !!text,
    queryKey: [QueryKey.TickerSearch, text],
    queryFn: async () => {
      const response = await axios.get(Url.TickerSearch(text));
      setOptions(response.data.quotes);
      return response.data;
    },
  });

  const getStockExchangeInfoForOption = (option: Quote) =>
    stockExchangeCountries.find(({ exchangeShortName }) =>
      [option.exchDisp, option.exchange].includes(exchangeShortName)
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