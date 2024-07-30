export default function Pagination({ pages, currentPage = 1, setPage }) {
  const beforeCurrent =
    currentPage === 1
      ? 1
      : currentPage > pages - 3
      ? pages - 3
      : currentPage - 1;
  const afterCurrent = currentPage > 4 ? currentPage + 1 : 4;

  const handelCurrentPage = (page) => {
    window.scrollTo(0, 0);
    setPage(page);
  };

  return (
    <div className="d-flex justify-content-end text-white">
      <div
        className={`pagination-item ${currentPage === 1 ? "d-none" : ""}`}
        role="button"
        onClick={() => handelCurrentPage(currentPage - 1)}
      >
        <span className="mx-auto">&laquo;</span>
      </div>
      <div
        className={`pagination-item ${
          currentPage === 1 ? "pagination-active" : ""
        }`}
        role="button"
        onClick={() => handelCurrentPage(1)}
      >
        <span className="mx-auto">1</span>
      </div>
      <div
        className={`pagination-item dropdown ${
          currentPage <= 4 || pages - 2 < 4 ? "d-none" : ""
        }`}
      >
        <span
          className="mx-auto dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          id="dropdownMenuButton1"
          aria-haspopup="true"
          aria-expanded="false"
        >
          ...
        </span>
        <div
          className={`dropdown-menu p-0 rounded-0 ${
            currentPage < 4 ? "d-none" : ""
          }`}
          aria-labelledby="dropdownMenuButton1"
          style={{
            maxWidth: "40px",
            minWidth: "90px",
            maxHeight: "150px",
            overflowX: "hidden",
          }}
        >
          {Array.from(Array(Math.abs(beforeCurrent - 2)), (_, i) => i + 2).map(
            (page, index) => (
              <p
                className="m-0 border-bottom dropdown--item pl-3"
                role="button"
                key={"pagination page 1 " + page + index}
                onClick={() => handelCurrentPage(page)}
              >
                {page}
              </p>
            )
          )}
        </div>
      </div>

      {Array.from(
        Array(pages - 5 > 0 ? 3 : pages - 2 <= 0 ? 0 : pages - 2),
        (_, i) =>
          currentPage <= 4
            ? i + 2
            : currentPage > pages - 3
            ? pages - 3 + i
            : i + currentPage - 1
      ).map((page, index) => (
        <div
          className={`pagination-item active ${
            currentPage === page ? "pagination-active" : ""
          }`}
          role="button"
          onClick={() => handelCurrentPage(page)}
          key={"pagination page  2 " + page + index}
        >
          <span className="mx-auto">{page}</span>
        </div>
      ))}
      <div
        className={`pagination-item dropdown ${
          currentPage <= pages - 3 && pages > 5 ? "" : "d-none"
        }`}
      >
        <span
          className="mx-auto dropdown-toggle"
          role="button"
          data-toggle="dropdown"
          id="dropdownMenuButton2"
          aria-haspopup="true"
          aria-expanded="false"
        >
          ...
        </span>
        <div
          className={`dropdown-menu p-0 rounded-0${
            currentPage <= pages - 3 ? "" : "d-none"
          }`}
          aria-labelledby="dropdownMenuButton2"
          style={{
            maxWidth: "40px",
            minWidth: "90px",
            maxHeight: "150px",
            overflowX: "hidden",
          }}
        >
          {Array.from(
            Array(Math.abs(pages - afterCurrent - 1)),
            (_, i) => afterCurrent + i + 1
          ).map((page, index) => (
            <p
              className="m-0 border-bottom dropdown--item pl-3"
              role="button"
              key={"pagination page 3 " + page + index}
              onClick={() => handelCurrentPage(page)}
            >
              {page}
            </p>
          ))}
        </div>
      </div>
      <div
        className={`pagination-item ${
          pages === 1
            ? "d-none"
            : currentPage === pages
            ? "pagination-active"
            : ""
        }`}
        role="button"
        onClick={() => handelCurrentPage(pages)}
      >
        <span className="mx-auto">{pages}</span>
      </div>
      <div
        className={`pagination-item ${currentPage >= pages ? "d-none" : ""}`}
        role="button"
        onClick={() => handelCurrentPage(currentPage + 1)}
      >
        <span className="mx-auto">&raquo;</span>
      </div>
    </div>
  );
}
