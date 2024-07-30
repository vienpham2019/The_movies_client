export default function LoadingPage() {
  return (
    <div
      className="d-flex align-items-center"
      style={{ backgroundColor: "black", height: "100vh", width: "100vw" }}
    >
      <div className="container text-center">
        <div className="sk-chase mx-auto">
          {Array.from(Array(6)).map((_, index) => (
            <div className="sk-chase-dot" key={"loading page " + index}></div>
          ))}
        </div>
        <h4 className="text-muted mt-4">Loading... Please Wait</h4>
      </div>
    </div>
  );
}
