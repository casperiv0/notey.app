import * as React from "react";
import { connect } from "react-redux";
import { logout } from "@actions/auth";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface Props {
  logout: () => void;
}

const Logout: NextPage<Props> = ({ logout }) => {
  const router = useRouter();

  React.useEffect(() => {
    logout();

    router.push("/");
  }, [logout, router]);

  return null;
};

export default connect(null, { logout })(Logout);
