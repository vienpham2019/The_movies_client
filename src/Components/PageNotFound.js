import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section
      className="py-5 d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            <h4 className="mb-4 border-bottom">
              {" "}
              <span className="py-3 bg-white" style={{ fontSize: "5em" }}>
                404.
              </span>
            </h4>
            <h2 className="mb-2">Page not found.</h2>

            <p className="mb-7 text-gray-500">
              Sorry, we couldn't find the page you where looking for. We suggest
              that you return to home page.
            </p>

            <span
              className="btn_ btn-block_ border bg-dark text-white py-3 mt-2"
              role="button"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
