import yahooFinance from "yahoo-finance2";
import { x } from "@xstyled/styled-components";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Tooltip,
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
import { PageLevelCircularProgress } from "components/PageLevelCircularProgress";
import InfoIcon from "@mui/icons-material/Info";
import React from "react";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function Page() {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const getHoldingsQuery = useQueryGetHoldings();
  const holdings = getHoldingsQuery.data ?? [];

  const currentValuation = (holding: Holding) => {
    if (!holding.price) return 0;
    return holding.price * holding.quantity;
  };

  const currentFormattedValuation = (holding: Holding) => {
    const value = currentValuation(holding);
    return currencyFormatter.format(value);
  };

  if (getHoldingsQuery.isFetching) {
    return <PageLevelCircularProgress />;
  }

  const total = holdings.reduce(
    (sum, holding) => sum + currentValuation(holding),
    0
  );

  const annualAverageInterest = currencyFormatter.format(total * 0.08);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        px: 2,
      }}
    >
      <Card sx={{ minWidth: 275, my: "2rem" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total {total}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            You will earn on average {annualAverageInterest} portfolio growth
            per year!
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                onClick={() => setOpen(true)}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                open={open}
                title="On average, the world market has returned 8% annualised average growth over the past century"
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          </Typography>
        </CardContent>
      </Card>
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
                    <Typography variant="body2">
                      {holding.quantity}
                      {FormattingConstants.Interpunct}
                      {currentFormattedValuation(holding)}
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
