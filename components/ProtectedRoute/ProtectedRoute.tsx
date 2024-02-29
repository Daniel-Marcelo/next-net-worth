import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

// export function ProtectedRoute({ children }: PropsWithChildren) {
//   const { status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "unauthenticated") {
//     return <p>Access Denied</p>;
//   }

//   return <>{children}</>;
// }

export function withProtection(Component) {
  return function WithPublic(props) {
    const router = useRouter();
    const { status } = useSession();

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    return <Component {...props} />;
  };
}
