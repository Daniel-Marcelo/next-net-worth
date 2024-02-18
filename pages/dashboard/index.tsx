import yahooFinance from "yahoo-finance2";
import { withProtected } from "../../components/RouteProtection";
import { x } from "@xstyled/styled-components";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { useState } from "react";
import {
  Quote,
  QuoteType,
  TickerSearchResponse,
} from "../../types/api/ticker-search.types";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../const/query.constants";
import axios from "axios";
import { stockExchangeCountries } from "../../const/exchangesToCountries.constants";

function Page({ data }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<Quote[]>([]);

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

  const getStockExchangeInfoForOption = (option: Quote) =>
    stockExchangeCountries.find(({ exchangeShortName }) =>
      [option.exchDisp, option.exchange].includes(exchangeShortName)
    );

  return (
    <x.div>
      <TextField
        sx={{
          margin: 0,
        }}
        label="Search for a ticker"
        variant="filled"
        onChange={onChange}
        fullWidth
      />
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {!!options?.length &&
          options
            .filter((option) => option.quoteType === QuoteType.Equity)
            .map((option) => ({
              ...option,
              exchangeInfo: getStockExchangeInfoForOption(option),
            }))
            .map((option) => (
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <Typography>
                        {option.symbol} | {option.shortname}
                      </Typography>
                    </>
                  }
                  secondary={
                    <Box display="flex" alignItems="center" gap=".5rem">
                      <Typography component="span">
                        {option.exchange || option.exchDisp}{" "}
                      </Typography>
                      {option.exchangeInfo && (
                        <>
                          |{" "}
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.exchangeInfo.countryCode.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.exchangeInfo.countryCode.toLowerCase()}.png`}
                            alt=""
                          />
                        </>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
      </List>
    </x.div>
  );
}

export async function getServerSideProps(props) {
  const res = await yahooFinance.quoteSummary("AAPL", {
    modules: ["assetProfile"],
  });
  return { props: { data: JSON.parse(JSON.stringify(res)) } };
}
export default withProtected(Page);
