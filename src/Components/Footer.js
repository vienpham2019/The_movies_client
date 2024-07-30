function Footer() {
  return (
    <footer className="section pb-4" style={{ backgroundColor: "black" }}>
      <div className="footer-modern-main desktop--footer">
        <div className="row mx-auto" style={{ width: "80%" }}>
          <div className="col-3 mr-5 my-auto">
            <p className="text-white">CONTACT INFOMATION</p>
            <ul>
              <li className="pb-2 border-bottom row m-0">
                <div className="col-1 mr-3">
                  <i className="fas fa-map-pin fa-2x"></i>
                </div>
                <div className="col">
                  <span className="text-white">ADDRESS</span> <br />
                  <span>1234 Street Name, City, England</span>
                </div>
              </li>
              <li className="pb-2 border-bottom row m-0 pt-4">
                <div className="col-1 mr-3">
                  <i className="fas fa-phone-alt fa-2x"></i>
                </div>
                <div className="col">
                  <span className="text-white">PHONE</span> <br />
                  <span>(123) 456 789</span>
                </div>
              </li>
              <li className="pt-4 row m-0">
                <div className="col-1 mr-3">
                  <i className="fas fa-envelope fa-2x"></i>
                </div>
                <div className="col">
                  <span className="text-white">EMAIL</span> <br />
                  <span>mail@example.com</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="col">
            <div>
              <div className="d-flex bd-highlight text-white">
                <div className="p-2 flex-grow-1 bd-highlight ">The Movies</div>
                <div className="p-2 bd-highlight">
                  <i className="fab fa-facebook-f m-3"> Facebook</i>
                  <i className="fab fa-twitter m-3"> Twitter</i>
                  <i className="fab fa-google-plus-g m-3"> Google</i>
                  <i className="fab fa-vimeo-v m-3"> Vimeo</i>
                  <i className="fas fa-rss m-3"> RSS</i>
                </div>
              </div>
              <hr />
            </div>
            <div className="row">
              <div
                className="col-5 mx-4"
                style={{ borderRight: "1px solid #A9A9A9" }}
              >
                <p className="footer-modern-title text-white">About Us</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque impedit corrupti iure culpa labore libero, dicta
                  placeat, ex saepe ut omnis autem officia. Possimus nulla odio
                  repellendus veritatis sed laboriosam!
                </p>
              </div>
              <div
                className="col-sm-7 col-md-5 col-lg-4"
                style={{ borderRight: "1px solid #A9A9A9" }}
              >
                <p className="footer-modern-title text-white">
                  Movie Categories
                </p>
                <div className="footer-modern-item-block">
                  <div className="row row-13">
                    <div className="col-6">
                      <ul className="list list-1">
                        <li>Action</li>
                        <li>Adventure</li>
                        <li>Animation</li>
                        <li>Comedy</li>
                        <li>Crime</li>
                      </ul>
                    </div>

                    <div className="col-6">
                      <ul className="list list-1">
                        <li>Drama</li>
                        <li>Fantacy</li>
                        <li>Horror</li>
                        <li>Mystrey</li>
                        <li>Romance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col ml-3">
                <p className="footer-modern-title text-white">Support</p>
                <div className="footer-modern-item-block">
                  <ul className="list list-1">
                    <li>My Account</li>
                    <li>FAQ</li>
                    <li>Help Center</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-2">
        <small className="rights">
          <span>Copyright ©&nbsp; </span>
          <span className="copyright-year">2020</span>
          <span>&nbsp;</span>
          <span>. All rights reserved.&nbsp;</span>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
