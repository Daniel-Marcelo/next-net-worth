import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash/debounce";
import { QueryKey } from "../../const/query.constants";
import {
  YFQuote,
  TickerSearchResponse,
} from "../../types/api/ticker-search.types";
import SearchIcon from "@mui/icons-material/Search";

export const CountrySelect = () => {
  const [text, setText] = React.useState("");
  const [options, setOptions] = React.useState<YFQuote[]>([]);

  useQuery<TickerSearchResponse>({
    enabled: !!text,
    queryKey: [QueryKey.TickerSearch, text],
    queryFn: async () => {
      const response = await axios.get("api/ticker-search/" + text);
      setOptions(response.data.quotes);
      return response.data;
    },
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => setText(e.target.value),
    200
  );

  return (
    <Autocomplete<YFQuote>
      id="country-select-demo"
      //   sx={{ width: 300 }}
      fullWidth
      sx={{
        width: "100%",
        "& .MuiAutocomplete-popupIndicator": { transform: "none" },
        "& .MuiOutlinedInput-root": {
          // border: "1px solid yellow",
          //   borderRadius: "0",
          //   padding: "0",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "0",
        },
      }}
      disablePortal
      options={options}
      popupIcon={<SearchIcon />}
      filterOptions={(x) => x.filter((quote) => quote.isYahooFinance)}
      autoHighlight
      getOptionLabel={(option) => option.shortname || option.longname}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.shortname}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          label="Search for a stock"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          sx={{
            border: "0px",
          }}
        />
      )}
    />
  );
};
