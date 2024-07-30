import { useState } from "react";
import { useDispatch } from "react-redux";
import { A_set_user } from "../../reducer/Actions/user_action";
import { validateLength, validateEmail } from "../../validation";
import {
  login,
  register,
  set_widhlists_and_favorites,
} from "../../user_helper_method";

export default function LoginModal() {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerError, setRegisterError] = useState({});
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerValue, setRegisterValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginSuccess) return;
    let { email, password } = loginValue;
    let email_error = validateEmail(email);
    let password_error = validateLength(password, "Password", 5);
    setIsLoginLoading(true);
    let data = await login(email, password);
    if (email_error || password_error || data.error) {
      setLoginError(true);
    } else {
      let w_and_f = set_widhlists_and_favorites(data.widhlists, data.favorites);
      dispatch(A_set_user(data, w_and_f));
      setLoginError(false);
      setLoginSuccess(true);
    }
    setIsLoginLoading(false);
  };

  const resetLogin = () => {
    setLoginSuccess(false);
    setLoginError(false);
    setIsLoginLoading(false);
    setLoginValue({ email: "", password: "" });
  };

  const resetRegister = () => {
    setRegisterSuccess(false);
    setRegisterError({});
    setRegisterValue({ firstName: "", lastName: "", email: "", password: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerSuccess) return;
    let { firstName, lastName, email, password } = registerValue;
    let firstName_error = validateLength(firstName, "First name", 1);
    let lastName_error = validateLength(lastName, "Last name", 1);
    let email_error = validateEmail(email);
    let password_error = validateLength(password, "Password", 5);
    let register_data = await register({
      first_name: firstName,
      last_name: lastName,
      email,
      password: "",
    });
    if (
      firstName_error ||
      lastName_error ||
      email_error ||
      password_error ||
      register_data.error
    ) {
      setRegisterError({
        firstName_error,
        lastName_error,
        email_error:
          email_error ||
          (register_data.error && `Email ${register_data.error}`),
        password_error,
      });
      setRegisterSuccess(false);
    } else {
      let register_data = await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      if (!register_data.error) {
        setRegisterError({});
        setRegisterSuccess(true);
      }
    }
  };
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="login-modal"
      data-backdrop="static"
      data-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog h-auto border">
        <div className="modal-content rounded-0">
          <div>
            <div className="card-header px-lg-7 px-3 pt-3 pb-0 border-0 bg-transparent">
              <span
                className="close close-absolute"
                role="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  resetLogin();
                  resetRegister();
                }}
              >
                <i className="fas fa-times"></i>
              </span>
              <div className="row d-flex no-gutters border-bottom mb-3">
                <ul className="nav list-inline" role="tablist">
                  <li className="list-inline-item">
                    <a
                      className="nav-link nav-link-lg active"
                      data-toggle="tab"
                      href="#nav-login-modal"
                      role="tab"
                      id="loginModalLinkLogin"
                      aria-controls="nav-login-modal"
                      aria-selected="true"
                      onClick={resetRegister}
                    >
                      Login
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="nav-link nav-link-lg"
                      data-toggle="tab"
                      href="#nav-register-modal"
                      role="tab"
                      id="loginModalLinkRegister"
                      aria-controls="nav-register-modal"
                      aria-selected="false"
                      onClick={resetLogin}
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="nav-login-modal"
                role="tabpanel"
                aria-labelledby="nav-login-modal-modal-tab"
              >
                {loginSuccess && (
                  <div className="w-100 bg--success py-3 text-white text-center animate__animated animate__fadeIn">
                    <i className="fas fa-check mr-1"></i>Login Success!
                  </div>
                )}
                {isLoginLoading && (
                  <div className="container">
                    <div
                      className="spinner-border"
                      style={{ width: "1.5em", height: "1.5em" }}
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <span className="ml-2">Loading....</span>
                  </div>
                )}

                <div className="card-block px-lg-7 px-3 pt-6 pb-5">
                  <form onSubmit={handleLogin}>
                    <div className="col-12 p-0 my-4">
                      <div className="new-review-effect">
                        <input
                          className={`form-control form-control-sm rounded-0 new-review-input ${
                            loginError && "is-invalid"
                          }`}
                          placeholder="Email *"
                          value={loginValue.email}
                          onChange={(e) =>
                            setLoginValue({
                              ...loginValue,
                              email: e.target.value,
                            })
                          }
                        />
                        <span className="gt-focus-border"> </span>
                      </div>
                      {loginError && (
                        <small className="error_message">
                          Incorrect email or password.
                        </small>
                      )}
                    </div>
                    <div className="col-12 p-0 my-4">
                      <div className="new-review-effect">
                        <input
                          className={`form-control form-control-sm rounded-0 new-review-input ${
                            loginError && "is-invalid"
                          }`}
                          placeholder="Password *"
                          type="password"
                          value={loginValue.password}
                          onChange={(e) =>
                            setLoginValue({
                              ...loginValue,
                              password: e.target.value,
                            })
                          }
                        />
                        <span className="gt-focus-border"></span>
                      </div>
                      {loginError && (
                        <small className="error_message">
                          Incorrect email or password.
                        </small>
                      )}
                    </div>

                    <button
                      className="btn_ btn-block_ btn-outline-dark_ border"
                      type="submit"
                    >
                      <i className="fa fa-sign-in-alt mr-2"></i> Log in
                    </button>
                  </form>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-register-modal"
                role="tabpanel"
                aria-labelledby="nav-register-modal-modal-tab"
              >
                {registerSuccess && (
                  <div className="w-100 bg--success py-3 text-white text-center animate__animated animate__fadeIn">
                    <i className="fas fa-check mr-1"></i> Registered
                    successfully. please login...!
                  </div>
                )}

                <div className="card-block px-lg-7 px-4 pt-6 pb-5">
                  <form onSubmit={handleRegister}>
                    <div className="row px-2 my-3">
                      <div className="col p-0 mx-2">
                        <div className="new-review-effect">
                          <input
                            className={`form-control form-control-sm rounded-0 new-review-input ${
                              registerError.firstName_error && "is-invalid"
                            }`}
                            placeholder="First name *"
                            onChange={(e) =>
                              setRegisterValue({
                                ...registerValue,
                                firstName: e.target.value,
                              })
                            }
                            value={registerValue.firstName}
                          />
                          <span className="gt-focus-border"> </span>
                          {registerError.firstName_error && (
                            <small className="error_message">
                              {registerError.firstName_error}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col p-0 mx-2">
                        <div className="new-review-effect">
                          <input
                            className={`form-control form-control-sm rounded-0 new-review-input ${
                              registerError.lastName_error && "is-invalid"
                            }`}
                            onChange={(e) =>
                              setRegisterValue({
                                ...registerValue,
                                lastName: e.target.value,
                              })
                            }
                            value={registerValue.lastName}
                            placeholder="Last name *"
                          />
                          <span className="gt-focus-border"> </span>
                          {registerError.lastName_error && (
                            <small className="error_message">
                              {registerError.lastName_error}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col p-0 my-3">
                      <div className="new-review-effect">
                        <input
                          className={`form-control form-control-sm rounded-0 new-review-input ${
                            registerError.email_error && "is-invalid"
                          }`}
                          onChange={(e) =>
                            setRegisterValue({
                              ...registerValue,
                              email: e.target.value,
                            })
                          }
                          value={registerValue.email}
                          placeholder="Email *"
                        />
                        <span className="gt-focus-border"> </span>
                        {registerError.email_error && (
                          <small className="error_message">
                            {registerError.email_error}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col p-0 my-3">
                      <div className="new-review-effect">
                        <input
                          className={`form-control form-control-sm rounded-0 new-review-input ${
                            registerError.password_error && "is-invalid"
                          }`}
                          placeholder="Password *"
                          type="password"
                          onChange={(e) =>
                            setRegisterValue({
                              ...registerValue,
                              password: e.target.value,
                            })
                          }
                          value={registerValue.password}
                        />
                        <span className="gt-focus-border"> </span>
                        {registerError.password_error && (
                          <small className="error_message">
                            {registerError.password_error}
                          </small>
                        )}
                      </div>
                    </div>

                    <button
                      className="btn_ btn-block_ btn-outline-dark_ border"
                      type="submit"
                    >
                      <i className="far fa-user mr-2"></i>Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
