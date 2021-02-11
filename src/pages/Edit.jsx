import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import { getUserDetails, updateUser } from "../utils/httpHelper";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserEdit() {
  const [initForm, setInitForm] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getUserDetails(id).then((res) => {
      const { data } = res;
      const date = new Date(data.birthDate * 1000);
      const years = date.getFullYear();
      const months = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
      const days = (date.getDay() < 10 ? "0" : "") + date.getDay();
      setInitForm({
        ...data,
        picture: "",
        birthDate: `${years}-${months}-${days}`,
      });
    });
  }, [id]);

  function handleEditUser({ user }) {
    updateUser(user).then(() => history.push("/"));
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
        <h1>
          Edit - {initForm && initForm.username ? initForm.username : "Form"}
        </h1>
      </div>
      <UserForm onSubmit={handleEditUser} initForm={initForm} />
    </>
  );
}

export default UserEdit;
