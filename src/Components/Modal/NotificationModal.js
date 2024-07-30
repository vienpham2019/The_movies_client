import { useSelector, useDispatch } from "react-redux";
import { A_set_notification } from "../../reducer/Actions/notification_action";
export default function NotificationModal() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notificationReducer);
  return (
    <div
      id="notificationModal"
      className="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Notifications</h5>
            <span
              className="close close-absolute"
              role="button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => dispatch(A_set_notification([]))}
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="modal-body h-100" style={{ overflowY: "auto" }}>
            {notifications.map((n, i) => (
              <div
                className="card shadow border-0 px-2 rounded-0"
                key={"modal notification modal " + i}
              >
                <div className="row">
                  <div className="col-auto me-auto my-auto">
                    <img
                      src={n.image}
                      alt={n.message}
                      style={{ width: "50px" }}
                    />
                  </div>
                  <div className="col h-auto">
                    <div className="card-body">
                      <p className="card-text">
                        <div>
                          <strong>{n.target}</strong>{" "}
                          <span className={`text-${n.type}`}>{n.message}</span>{" "}
                          <br />
                          <small className="text-muted">{n.time}</small>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
