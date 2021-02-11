import UserForm from "../components/UserForm";
import { createUser } from "../utils/httpHelper";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserCreate() {
  const history = useHistory();

  function handleCreateUser({ user }) {
    createUser(user).then(() => history.push("/"));
  }

  function handleGoBack() {
    history.goBack();
  }

  return (
    <>
      <div className="d-flex justify-center align-center heading-text">
        <FontAwesomeIcon
          color="grey"
          icon="arrow-alt-circle-left"
          size="2x"
          className="cursor-pointer mr-2"
          onClick={handleGoBack}
        />
        <h1> User Create Form</h1>
      </div>
      <UserForm onSubmit={handleCreateUser} />
    </>
  );
}

export default UserCreate;
