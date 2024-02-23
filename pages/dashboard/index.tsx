import yahooFinance from "yahoo-finance2";
import { withProtected } from "../../components/RouteProtection";
import { x } from "@xstyled/styled-components";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { useState } from "react";
import { QuoteType } from "../../types/api/ticker-search.types";

import { useQueryTickerSearch } from "../../hooks/useQueryTickerSearch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Page() {
  const { options, onChangeSearchText } = useQueryTickerSearch();

  const q = useQuery({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const response = await axios.get("api/portfolios");
      return response.data;
    },
  });

  console.log(q.data);

  return (
    <x.div>
      <TextField
        label="Search for a ticker"
        variant="filled"
        onChange={onChangeSearchText}
        fullWidth
      />
      <List sx={{ width: "100%" }}>
        {!!options?.length &&
          options
            // .filter((option) =>
            //   [QuoteType.Equity, QuoteType.Etf].includes(option.quoteType)
            // )
            .map((option) => (
              <ListItem>
                {option.website ? (
                  <x.img
                    loading="lazy"
                    borderRadius=".5rem"
                    mr="1rem"
                    width="40"
                    srcSet={`https://logo.clearbit.com/${option.website} 2x`}
                    src={`https://logo.clearbit.com/${option.website}&size=196`}
                    alt=""
                  />
                ) : (
                  option.quoteType && (
                    <ListItemAvatar>
                      <Avatar>
                        <Typography fontSize=".875rem">
                          {option.typeDisp}
                        </Typography>
                      </Avatar>
                    </ListItemAvatar>
                  )
                )}
                <ListItemText
                  primary={<Typography>{option.shortname}</Typography>}
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
