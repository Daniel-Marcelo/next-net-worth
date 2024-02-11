import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "../context/AuthContext";

export function withPublic(Component) {
  return function WithPublic(props) {
    const user = useAuthContext();
    const router = useRouter();

    if (user) {
      router.replace("/dashboard");
      return <div>Loading</div>;
    }
    if (user === undefined) {
      return <div>Loading</div>;
    }
    return <Component {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const user = useAuthContext();
    const router = useRouter();

    if (user) {
      return <Component {...props} />;
    }
    if (user === undefined) {
      return <div>Loading</div>;
    }
    router.replace("/login");
    return <div>Loading</div>;
  };
}
