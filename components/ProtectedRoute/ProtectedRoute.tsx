import { PageLevelCircularProgress } from "components/PageLevelCircularProgress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function withProtection(Component) {
  return function WithPublic(props) {
    const router = useRouter();
    const { status } = useSession();

    if (status === "loading") {
      return <PageLevelCircularProgress />;
    }

    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    return <Component {...props} />;
  };
}
