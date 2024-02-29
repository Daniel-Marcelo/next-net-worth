import yahooFinance from "yahoo-finance2";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Button } from "@mui/material";
import { LoginBtN } from "../../components/loginbtn";
function Page({ data }) {
  return (
    <>
      <Button>Login</Button>
      <LoginBtN />
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
