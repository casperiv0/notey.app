import { NotFoundContainer, NotFoundTitle } from "@styles/404";

const UserOfflineError = () => {
  return (
    <>
      <NotFoundContainer>
        <NotFoundTitle>Error!</NotFoundTitle>

        <p>You are currently offline. notey.app will not work in offline mode.</p>
      </NotFoundContainer>
    </>
  );
};

export default UserOfflineError;

// import { NextPage } from "next";
// import Link from "next/link";
// import { NotFoundContainer, NotFoundTitle, NotFoundBtn } from "@styles/404";
// import Head from "next/head";

// const NotFound: NextPage = () => {
//   return (

//   );
// };

// export default NotFound;
