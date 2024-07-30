import { useState } from "react";
import { useSelector } from "react-redux";
import { validateLength } from "../../validation";
import { handle_update_password } from "../../user_helper_method";
export default function ChangePassword(props) {
  let { token } = useSelector((state) => state.userReducer);
  const [newPasswordError, setNewPasswordError] = useState({});
  const [updatePasswordSuccess, setUpdatePasswordSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirm_password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { password, confirm_password } = newPassword;
    let password_error = validateLength(password, "Password", 5);
    let confirm_password_error = validateLength(
      confirm_password,
      "Confirm password",
      5
    );
    if (password_error || confirm_password_error) {
      setNewPasswordError({ password_error, confirm_password_error });
    } else if (password !== confirm_password) {
      let text = "The new password and confirm password do not match.";
      setNewPasswordError({
        password_error: text,
        confirm_password_error: text,
      });
    } else {
      await handle_update_password(password, token);
      setNewPasswordError({});
      setNewPassword({ password: "", confirm_password: "" });
      setUpdatePasswordSuccess(true);
    }
  };

  return (
    <div className="p-4">
      <h4 className="mb-4 border-bottom pb-2">
        {" "}
        <span className="py-3 bg-light">Change password</span>
      </h4>
      {updatePasswordSuccess && (
        <div className="w-100 bg--success mb-3 py-3 text-white text-center animate__animated animate__fadeIn">
          <i className="fas fa-check mr-1"></i>Update Successful!
        </div>
      )}
      <form className="w-100 m-0" onSubmit={async (e) => handleSubmit(e)}>
        <div className="row mb-4 mt-2">
          <div className="col">
            <span>Current password</span>
            <input
              className="form-control form-control-sm rounded-0 new-review-input"
              type="password"
              value="1234567"
              disabled
            />
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <input
              className={`form-control form-control-sm rounded-0 new-review-input ${
                newPasswordError.password_error && "is-invalid"
              }`}
              type="password"
              value={newPassword.password}
              onChange={(e) =>
                setNewPassword({ ...newPassword, password: e.target.value })
              }
              placeholder="New Password"
            />
            {newPasswordError.password_error && (
              <small className="error_message">
                {newPasswordError.password_error}
              </small>
            )}
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <input
              className={`form-control form-control-sm rounded-0 new-review-input ${
                newPasswordError.confirm_password_error && "is-invalid"
              }`}
              type="password"
              value={newPassword.confirm_password}
              onChange={(e) =>
                setNewPassword({
                  ...newPassword,
                  confirm_password: e.target.value,
                })
              }
              placeholder="Confirm Password"
            />
            {newPasswordError.confirm_password_error && (
              <small className="error_message">
                {newPasswordError.confirm_password_error}
              </small>
            )}
          </div>
        </div>
        <button className="review-button w-100 py-3" type="submit">
          UPDATE PASSWORD
        </button>
      </form>
    </div>
  );
}
