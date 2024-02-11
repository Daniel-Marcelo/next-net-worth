import yahooFinance from "yahoo-finance2";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useLoginWithGoogle } from "../../hooks/useAuth";
import { withPublic } from "../../components/RouteProtection";
import { DrawerAppBar } from "../../components/NavBarV2";

function Page({ data }) {
  const loginWithGoogleMutation = useLoginWithGoogle();
  return (
    <>
      <DrawerAppBar />
      <GoogleLoginButton onClick={loginWithGoogleMutation.mutate} />
    </>
  );
}

export async function getServerSideProps(props) {
  const res = await yahooFinance.quoteSummary("NKE", {
    modules: ["assetProfile"],
  });
  return { props: { data: JSON.parse(JSON.stringify(res)) } };
}

export default Page;