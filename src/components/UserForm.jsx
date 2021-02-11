import { useState, useEffect } from "react";

function UserEditForm(props) {
  const [err, setErr] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    department: "0",
    birthDate: "",
    picture: "",
    isActive: true,
  });

  useEffect(() => {
    if (props.initForm) {
      setForm((prevState) => ({ ...prevState, ...props.initForm }));
    }
  }, [props.initForm]);

  function handleGetPasswordValidation() {
    const password = form.password;
    const birthDate = form.birthDate.replace("-", "");
    let passwordValidations = {
      hasCorrectLength: 8 <= password.length && password.length <= 16,
      hasNotIncludeBirthDate: !password.includes(birthDate),
      hasAlphaLetter: false,
      hasNumber: false,
      hasBigLetter: false,
      hasSmallLetter: false,
    };
    password.split("").forEach((digit) => {
      let charCode = digit.charCodeAt();
      if (32 < charCode && charCode < 48) {
        passwordValidations = {
          ...passwordValidations,
          hasAlphaLetter: true,
        };
      } else if (47 < charCode && charCode < 58) {
        passwordValidations = {
          ...passwordValidations,
          hasNumber: true,
        };
      } else if (64 < charCode && charCode < 91) {
        passwordValidations = {
          ...passwordValidations,
          hasBigLetter: true,
        };
      } else if (96 < charCode && charCode < 123) {
        passwordValidations = {
          ...passwordValidations,
          hasSmallLetter: true,
        };
      }
    });
    return !Object.values(passwordValidations).includes(false);
  }

  function handleChangeForm({ key, event }) {
    const valueKey = key === "isActive" ? "checked" : "value";
    setForm((prevState) => ({
      ...prevState,
      [key]: event.target[valueKey],
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErr(false);
    const passwordIsValid = handleGetPasswordValidation();
    if (passwordIsValid) {
      props.onSubmit({ user: { ...form } });
    } else {
      setErr(true);
    }
  }

  return (
    <div>
      {err ? <p className="error-message">Please check your password</p> : ""}

      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-center user-form"
      >
        <input
          placeholder="Username"
          type="text"
          required
          value={form.username}
          onChange={(event) => handleChangeForm({ key: "username", event })}
        />
        <input
          placeholder="Name"
          type="text"
          required
          value={form.name}
          onChange={(event) => handleChangeForm({ key: "name", event })}
        />
        <input
          placeholder="Surname"
          type="text"
          required
          value={form.surname}
          onChange={(event) => handleChangeForm({ key: "surname", event })}
        />
        <input
          placeholder="Email"
          type="email"
          required
          value={form.email}
          onChange={(event) => handleChangeForm({ key: "email", event })}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={form.password}
          onChange={(event) => handleChangeForm({ key: "password", event })}
        />
        <select
          value={form.department}
          onChange={(event) => handleChangeForm({ key: "department", event })}
        >
          <option value="0">Select a department</option>
          <option value="computer-engineering">Computer Engineering</option>
          <option value="chemical-engineering">Chemical Engineering</option>
          <option value="industrial-engineering">Industrial Engineering</option>
        </select>
        <input
          placeholder="Birthdate"
          type="date"
          required
          value={form.birthDate}
          onChange={(event) => handleChangeForm({ key: "birthDate", event })}
        />
        <input
          type="file"
          required
          value={form.picture}
          onChange={(event) => handleChangeForm({ key: "picture", event })}
        />
        <label htmlFor="isActive">
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => handleChangeForm({ key: "isActive", event })}
          />{" "}
          User Active
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserEditForm;
