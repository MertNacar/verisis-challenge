import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUsers, deleteUser } from "../utils/httpHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserList() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((res) => {
        setErrMessage("Couldn't get users.");
        setErr(res.err);
        setLoading(false);
      });
  }, []);

  function handleDeleteUser(id) {
    setErr(false);
    setLoading(true);
    deleteUser(id)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setLoading(false);
      })
      .catch((res) => {
        setErrMessage("Couldn't delete.");
        setErr(res.err);
        setLoading(false);
      });
  }

  function handleCapitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function handleEditUser(id) {
    history.push(`/edit/${id}`);
  }

  if (loading)
    return (
      <div className="d-flex justify-center align-center">Loading ...</div>
    );
  else
    return (
      <>
        {err ? (
          <div className="d-flex justify-center align-center">
            <p className="error-message">{errMessage}</p>
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-center align-center">
          <div className="pa-4 d-flex flex-column">
            {users.map(
              ({ id, username, name, surname, department, isActive }) => {
                let departmentWords = department.split("-");
                return (
                  <div
                    key={id}
                    className="user-item w-100 pa-5 my-3 d-flex justify-space-around align-center"
                  >
                    <FontAwesomeIcon
                      color="grey"
                      icon="user-circle"
                      size="3x"
                      className="mr-2"
                    />
                    <span className=" user-item-part">{username}</span>
                    <span className=" user-item-part d-flex justify-center align-center">
                      {name} {surname}
                    </span>
                    <span className=" user-item-part d-flex justify-center align-center">
                      {handleCapitalize(departmentWords[0])}{" "}
                      {handleCapitalize(departmentWords[1])}
                    </span>
                    <span
                      className={`user-item-part d-flex justify-center align-center ${
                        isActive ? "green--text" : "red--text"
                      }`}
                    >
                      {isActive ? "Active" : "Not Active"}
                    </span>

                    <FontAwesomeIcon
                      size="lg"
                      color="grey"
                      icon="edit"
                      className="cursor-pointer"
                      onClick={() => handleEditUser(id)}
                    />
                    <FontAwesomeIcon
                      size="lg"
                      color="grey"
                      icon="trash"
                      className="ml-2 cursor-pointer"
                      onClick={() => handleDeleteUser(id)}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </>
    );
}

export default UserList;
