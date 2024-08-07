import yahooFinance from "yahoo-finance2";
import { x } from "@xstyled/styled-components";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryTickerSearch } from "../../hooks/useQueryTickerSearch";
import { withProtection } from "../../components/ProtectedRoute";
import { AddCircle } from "@mui/icons-material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryGetHoldings } from "hooks/useQueryGetHoldings";

function Page() {
  const { options, onChangeSearchText, query } = useQueryTickerSearch();
  const getHoldingsQuery = useQueryGetHoldings();

  const addHoldingMutation = useMutation({
    mutationFn: ({ symbol, name }: { symbol: string; name: string }) =>
      axios.post<{ symbol: string; name: string; quantity: number }>(
        "/api/holdings",
        {
          symbol,
          name,
          quantity: 0,
        }
      ),
  });

  const deleteHoldingMutation = useMutation({
    mutationFn: (id: string) => axios.delete("/api/holdings/" + id),
  });

  const holdings = getHoldingsQuery?.data ?? [];
  const getHolding = (symbol: string) =>
    holdings.find((holding) => holding.symbol === symbol);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Search for a ticker"
        variant="filled"
        onChange={onChangeSearchText}
        fullWidth
      />
      {!!options?.length && !query.isFetching && (
        <List sx={{ width: "100%" }}>
          {options.map((option) => (
            <ListItem
              secondaryAction={
                <>
                  {!getHolding(option.tickerSymbol) ? (
                    <AddCircle
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        addHoldingMutation.mutate({
                          symbol: option.tickerSymbol,
                          name: option.companyShortName,
                        })
                      }
                    />
                  ) : (
                    <RemoveCircleIcon
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteHoldingMutation.mutate(
                          getHolding(option.tickerSymbol)!.id
                        )
                      }
                    />
                  )}
                </>
              }
            >
              {option.companyWebsite ? (
                <x.img
                  loading="lazy"
                  borderRadius=".5rem"
                  mr="1rem"
                  width="40"
                  srcSet={`https://logo.clearbit.com/${option.companyWebsite} 2x`}
                  src={`https://logo.clearbit.com/${option.companyWebsite}&size=196`}
                  alt=""
                />
              ) : (
                option.equityType && (
                  <ListItemAvatar>
                    <Avatar>
                      <Typography fontSize=".875rem">
                        {option.displayType}
                      </Typography>
                    </Avatar>
                  </ListItemAvatar>
                )
              )}
              <ListItemText
                primary={<Typography>{option.companyShortName}</Typography>}
                secondary={
                  <Box display="flex" alignItems="center" gap=".5rem">
                    <Typography component="span">
                      {option.exchangeCode || option.exchangeDisplayName}{" "}
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
      )}
      {query.isFetching && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export async function getServerSideProps() {
  return { props: { data: {} } };
}
export default Page;
