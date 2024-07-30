import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { validateLength, validateEmail } from "../../validation";
import { update_user_info } from "../../user_helper_method";
import { A_update_user_info } from "../../reducer/Actions/user_action";
export default function PersonalData(props) {
  let { user, token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [userDataError, setUserDataError] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({ ...user });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { first_name, last_name, email } = userInfo;
    let first_name_error = validateLength(first_name, "First name", 1);
    let last_name_error = validateLength(last_name, "Last name", 1);
    let email_error = validateEmail(email);
    if (first_name_error || last_name_error || email_error) {
      setUserDataError({ first_name_error, last_name_error, email_error });
      setUpdateUserSuccess(false);
    } else {
      let user_data = await update_user_info({
        ...userInfo,
        token,
      });

      if (user_data.error) {
        setUserDataError({ email_error: user_data.error });
      } else {
        dispatch(A_update_user_info(userInfo));
        setUpdateUserSuccess(true);
        setUserDataError({});
        setTimeout(() => {
          setUpdateUserSuccess(false);
        }, 2000);
      }
    }
  };
  return (
    <div className="p-4">
      <h4 className="mb-4 border-bottom pb-2">
        {" "}
        <span className="py-3 bg-light">Personal data</span>
      </h4>
      {updateUserSuccess && (
        <div className="w-100 bg--success mb-3 py-3 text-white text-center animate__animated animate__fadeIn">
          <i className="fas fa-check mr-1"></i>Update Successful!
        </div>
      )}
      <form className="w-100 p-0" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col">
            <input
              className={`form-control form-control-sm rounded-0 new-review-input ${
                userDataError.first_name_error && "is-invalid"
              }`}
              placeholder="First Name *"
              value={userInfo.first_name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, first_name: e.target.value })
              }
            />
            {userDataError.first_name_error && (
              <small className="error_message">
                {userDataError.first_name_error}
              </small>
            )}
          </div>
          <div className="col">
            <input
              className={`form-control form-control-sm rounded-0 new-review-input ${
                userDataError.last_name_error && "is-invalid"
              }`}
              placeholder="Last name *"
              value={userInfo.last_name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, last_name: e.target.value })
              }
            />
            {userDataError.last_name_error && (
              <small className="error_message">
                {userDataError.last_name_error}
              </small>
            )}
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <input
              className={`form-control form-control-sm rounded-0 new-review-input ${
                userDataError.email_error && "is-invalid"
              }`}
              placeholder="Your Email *"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            {userDataError.email_error && (
              <small className="error_message">
                {userDataError.email_error}
              </small>
            )}
          </div>
        </div>
        <span style={{ fontSize: "0.8em" }}>DATE OF BIRTH</span>
        <div className="row mb-4 mt-2">
          <div className="col">
            <input
              className="form-control form-control-sm rounded-0 new-review-input"
              type="date"
              value={userInfo.dob}
              min="1999-01-01"
              max="2030-01-01"
              onChange={(e) =>
                setUserInfo({ ...userInfo, dob: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mt-2 py-2">
          <span className="ml-4" style={{ fontSize: "0.9em" }}>
            GENDER
          </span>
        </div>
        <div className="row px-4 pt-2 pb-4 m-0">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input m-0"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="option1"
              checked={userInfo.gender && userInfo.gender === "Male"}
              onChange={() => setUserInfo({ ...userInfo, gender: "Male" })}
            />
            <label className="text-muted form-check-label" for="inlineRadio1">
              MALE
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input m-0"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="option2"
              checked={userInfo.gender && userInfo.gender === "Female"}
              onChange={() => setUserInfo({ ...userInfo, gender: "Female" })}
            />
            <label className="text-muted form-check-label" for="inlineRadio2">
              FEMALE
            </label>
          </div>
        </div>
        <button className="review-button w-100 py-3" type="submit">
          SAVE CHANGE
        </button>
      </form>
    </div>
  );
}
