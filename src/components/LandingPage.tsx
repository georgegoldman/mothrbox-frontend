const LandinPage = () => {
    return (
        <div className="position-relative mothrbox-maxh col-12">
                <div className="position-absolute top-50 start-50 translate-middle col-12">
                  <div className="row">
                  <div className="d-flex justify-content-center">
                    <p className="border border-1 rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2">
                      <span className="material-symbols-outlined">radio_button_unchecked</span>
                      End-to-end encryption, one API call away
                    </p>
                  </div>

                    <div className="col-12 d-flex justify-content-center text-center">
                      <h1>Encrypt anything. Anywhere. Instantly. <br /> Your Stripe For Secure File & Data Encryption.</h1>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <p>A secure API and web platform to encrypt files & data with one click or one line of code.</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      {/* <div className="row"> */}
                        {/* <div className="col-3"></div> */}
                        {/* <Button className="btn btn-primary me-3">View Doc</Button>
                        <Button className="btn btn-primary me-3 col">Start Encryption</Button> */}
                        <button type="button" className="btn btn-outline-primary p-3 me-3 col-md-2 text-black">View Doc</button>
                        <button type="button" className="btn btn-outline-primary p-3 col-md-2 text-black">Start Encryption</button>
                        {/* <div className="col-3"></div> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default LandinPage;