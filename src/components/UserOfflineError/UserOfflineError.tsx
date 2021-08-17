import { NotFoundContainer, NotFoundTitle } from "@styles/404";

const UserOfflineError = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>Error!</NotFoundTitle>

      <p>You are currently offline. notey.app will not work in offline mode.</p>
    </NotFoundContainer>
  );
};

export default UserOfflineError;
