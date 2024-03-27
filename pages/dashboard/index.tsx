import yahooFinance from "yahoo-finance2";
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
} from "@mui/material";
import { useQueryTickerSearch } from "../../hooks/useQueryTickerSearch";
import { withProtection } from "../../components/ProtectedRoute";
import { Add, AddCircle } from "@mui/icons-material";
import { QuoteType } from "../../types/api/ticker-search.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryGetHoldings } from "hooks/useQueryGetHoldings";
import { FormattingConstants } from "const/formatting.constants";
import DescriptionIcon from "@mui/icons-material/Description";
import { Holding } from "types/holding.types";

function Page() {
  const getHoldingsQuery = useQueryGetHoldings();

  const holdings = getHoldingsQuery.data ?? [];

  const currentValuation = (holding: Holding) => {
    if (!holding.price) return 0;
    const value = holding.price * holding.quantity;

    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",

      minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(value);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!!holdings.length && !getHoldingsQuery.isFetching && (
        <List sx={{ width: "100%" }}>
          {holdings.map((holding) => (
            <ListItem>
              {holding.site ? (
                <x.img
                  loading="lazy"
                  borderRadius=".5rem"
                  mr="1rem"
                  width="40"
                  srcSet={`https://logo.clearbit.com/${holding.site} 2x`}
                  src={`https://logo.clearbit.com/${holding.site}&size=196`}
                  alt=""
                />
              ) : null}
              <ListItemText
                primary={
                  <Typography>
                    {holding.symbol}
                    {FormattingConstants.Interpunct}
                    {holding.name}
                  </Typography>
                }
                secondary={
                  <x.div display="flex" gap=".25rem" alignItems="center">
                    <Typography>{holding.quantity}</Typography>
                    <DescriptionIcon fontSize="small" />
                    <Typography sx={{ ml: ".25rem" }}>
                      {currentValuation(holding)}
                    </Typography>
                  </x.div>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export async function getServerSideProps(props) {
  const res = await yahooFinance.quoteSummary("AAPL", {
    modules: ["assetProfile"],
  });
  return { props: { data: JSON.parse(JSON.stringify(res)) } };
}
export default withProtection(Page);
