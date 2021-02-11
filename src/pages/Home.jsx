import UserList from "../components/UserList";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home() {
  const history = useHistory();

  function handleCreateNewUser() {
    history.push("/create");
  }

  return (
    <div>
      <div className="d-flex justify-center align-center pa-4 my-5">
        <h1 className="heading-text mr-4">User - List</h1>
        <FontAwesomeIcon
          color="grey"
          icon="user-plus"
          size="3x"
          className="cursor-pointer"
          onClick={handleCreateNewUser}
        />
      </div>
      <UserList />
    </div>
  );
}

export default Home;
