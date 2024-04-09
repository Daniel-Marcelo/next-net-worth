import { withProtection } from "components/ProtectedRoute";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { x } from "@xstyled/styled-components";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Url } from "const/urls.constants";
import { QueryKey } from "const/query.constants";
import { Box } from "@mui/material";
import { GetAddTickerResponse } from "types/api/add-ticker.types";

export const Page = () => {
  const router = useRouter();
  const symbol = router.query.id as string;

  const getTickerQuery = useQuery({
    queryKey: [QueryKey.GetAddTicker, symbol],
    queryFn: async ({ signal }) => {
      const response = await axios.get<GetAddTickerResponse>(
        Url.GetAddTicker(symbol),
        {
          signal,
        }
      );
      return response.data;
    },
  });

  return (
    <Box sx={{ p: "2rem" }}>
      <x.div>{symbol}</x.div>
      <x.div>{getTickerQuery.data?.name}</x.div>
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const symbol = (context.params?.id as string) ?? "";

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GetAddTicker, symbol],
    queryFn: async ({ signal }) => {
      const response = await axios.get<GetAddTickerResponse>(
        Url.GetAddTicker(symbol),
        {
          signal,
        }
      );
      return response.data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default withProtection(Page);
