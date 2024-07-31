export default function MovieTrailerModal() {
  const displayVideos = "";

  const stopVideo = () => {
    let iframes = [...document.getElementsByClassName("movie_trailer_iframe")];
    for (let iframe of iframes) {
      let { src } = iframe;
      iframe.src = src;
    }
  };

  return (
    <div
      className="modal fade"
      id="movieTrailerModal"
      tabIndex="-1"
      aria-labelledby="movieTrailerModal"
      aria-hidden="true"
    >
      <div
        className="modal-dialog custom-scrollbar border"
        style={{ minWidth: "90vw" }}
      >
        <div
          className="modal-content rounded-0"
          style={{ backgroundColor: "black" }}
        >
          <div className="modal-header border-0 m-0">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => stopVideo()}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body m-0">
            {!!displayVideos.length ? (
              <div
                id="MovieTrailerModal"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {displayVideos.map((v, i) => (
                    <div
                      className={`carousel-item p-5 ${i === 0 && "active"}`}
                      key={"modal  movie trailer modal detail " + i}
                    >
                      <div className="embed-responsive embed-responsive-21by9">
                        <iframe
                          className="embed-responsive-item movie_trailer_iframe"
                          src={v.videoUrl}
                          allowFullScreen
                          title={v.title}
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
                <ol className="carousel-indicators">
                  {displayVideos.map((_, i) => (
                    <li
                      data-target="#MovieTrailerModal"
                      data-slide-to={i}
                      key={"modal movie trailer modal video " + i}
                      className={`${i === 0 && "active"}`}
                      onClick={() => stopVideo()}
                    ></li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="h-100 d-flex align-items-center">
                <div className="text-center mx-auto">
                  <i className="fas fa-film fa-5x text-white"></i>
                  <h3 className="text-white">Movie Trailer</h3>
                  <h3 className="text-white">No Longer Avaliable</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
