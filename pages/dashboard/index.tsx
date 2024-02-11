import yahooFinance from "yahoo-finance2";
import { useLogout } from "../../hooks/useAuth";
import { withProtected } from "../../components/RouteProtection";

function Page({ data }) {
  const logout = useLogout();
  return (
    <>
      <button onClick={() => logout.mutate()}>Signout</button>
      <div>A post</div>
    </>
  );
}

export async function getServerSideProps(props) {
  const res = await yahooFinance.quoteSummary("AAPL", {
    modules: ["assetProfile"],
  });
  return { props: { data: JSON.parse(JSON.stringify(res)) } };
}
export default withProtected(Page);
