import React from "react";
import { useSession } from "next-auth/react";
import AccessDenied from "../../src/components/Access-denied";
import { testing } from "googleapis/build/src/apis/testing";

export default function Admin() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [content, setContent] = React.useState();
  return <div>Admin</div>;
}
