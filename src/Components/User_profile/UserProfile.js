import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalData from "./PersonalData";
import ChangePassword from "./ChangePassword";

import { A_set_user } from "../../reducer/Actions/user_action";

import "./User.css";
import { useNavigate } from "react-router-dom";
import Favorites from "./Favorites";
import Widhlist from "./Widhlist";
export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav_content, setNavContent] = useState("Personal data");
  const { user } = useSelector((state) => state.userReducer);
  const [displaySideBar, setSideBar] = useState(false);
  const profileNav = [
    { key: "Widhlist", icon: "fas fa-plus" },
    { key: "Favorites", icon: "far fa-heart" },
    { key: "Personal data", icon: "fas fa-user-edit" },
    { key: "Change password", icon: "fas fa-lock" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/");
      document.getElementById("login_nav_button").click();
    }
  }, [user, navigate]);

  return (
    <section
      className="pt-6 pb-12 pb-5 w-100 "
      style={{ marginTop: "120px", minHeight: "82vh", overflowX: "hidden" }}
    >
      <div className="w-100">
        <div className="row justify-content-around">
          <div
            className={`sidebar bg-white pt-5 shadow mb-1 ${
              displaySideBar ? "active" : ""
            }`}
            style={{ minWidth: "300px" }}
          >
            <div
              className="dismiss bg-white border"
              role="button"
              onClick={() => setSideBar(!displaySideBar)}
            >
              <i className="fas fa-times text-dark"></i>
            </div>
            <div className="top-movies-list">
              <h6 className="text-muted mb-5 mt-2 text-uppercase px-3">
                WELCOME, {user && `${user.firstName} ${user.lastName}`}!
              </h6>
              <nav className="mb-10 mb-md-0">
                <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                  {profileNav.map((value, i) => (
                    <div
                      key={
                        "user profile page user profile nav " + value.key + i
                      }
                    >
                      <span
                        className={`list-group-item-action py-4 d-flex rotate_icon px-3 ${
                          value.key === nav_content && "text-info"
                        }`}
                        role="button"
                        onClick={() => {
                          if (
                            value.key === "Favorites" ||
                            value.key === "Widhlist"
                          ) {
                            console.log();
                          }

                          setNavContent(value.key);
                        }}
                      >
                        <div className="bd-highlight mr-4">
                          <i className={`${value.icon} mr-2`}></i> {value.key}
                        </div>
                        <div
                          className={`ml-auto bd-highlight icon ${
                            (i === 0 || i === 1) && "rotate_down"
                          }`}
                        >
                          <i className="fas fa-angle-right"></i>
                        </div>
                      </span>

                      <hr className="m-0" />
                    </div>
                  ))}

                  <span
                    className="list-group-item-action py-4 px-3 d-flex bd-highlight"
                    role="button"
                    onClick={() => {
                      navigate("/");
                      dispatch(A_set_user(null));
                    }}
                  >
                    <div className="bd-highlight">
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </div>
                    <div className="ml-auto bd-highlight">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </span>
                </div>
              </nav>
            </div>
          </div>
          {/*  */}
          <div
            className="sidebar--toggler mb-2 bg-white"
            style={{
              width: "100%",
              height: "40px",
            }}
          >
            <div className="d-flex align-items-center h-100 w-100">
              <div
                className="ml-2 border p-2"
                role="button"
                onClick={() => setSideBar(!displaySideBar)}
              >
                <i class="fas fa-arrow-circle-right fa-1x text-dark">Menu</i>
              </div>
            </div>
          </div>
          {user && (
            <div className="col-12 col-md-9 bg-light mx-1 p-0 h-auto border">
              {nav_content === "Widhlist" && <Widhlist />}
              {nav_content === "Favorites" && <Favorites />}
              {nav_content === "Personal data" && <PersonalData />}
              {nav_content === "Change password" && <ChangePassword />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
