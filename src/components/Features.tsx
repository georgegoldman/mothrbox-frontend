const Features = () => {
    return (
        <div className="row mt-md-5 mb-md-5 pt-md-5">
            <div className="col-12 d-flex justify-content-center text-bold">
                <h1><strong>Our Key Features</strong></h1>
                
            </div>
            <div className="col-12 d-flex justify-content-center">
                <h5>Secure Your Data in Seconds — No Compromises.</h5>
            </div>
            <div className="col-12 my-md-3"></div>

            <div className="row mb-5">
                <div className="col-12">
                    <div className="row">
                    <div className="col-md-3 col-12 pe-5 ps-4">
                        <div className="col-12 ">
                            <div className="row p-md-3" style={{
                                    backgroundColor: "#7D78FF",
                                    borderRadius: "30px",

                                }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img src="/images/encryption.png" />
                                        
                                    </div>
                                    <div className="col-12 py-md-3 text-white">
                                        <h5 className=" d-flex justify-content-center" >End-to-End Encryption</h5>
                                        {/* <p className=" d-flex justify-content-center">Encrypt files, text, or data <br />streams securely using<br />AES-256.</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-3 col-12 pe-5 ps-4">
                            <div className="col-12">
                                <div className="row p-md-3" style={{
                                    backgroundColor: "#F6F6F6",
                                    borderRadius: "30px",

                                }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img src="/images/instant_result.png" />
                                    </div>
                                    <div className="col-12 py-md-3">
                                        <h5 className="d-flex justify-content-center" >Instant Results</h5>
                                        {/* <p className="d-flex justify-content-center">Encrypt files, text, or data streams securely using AES-256.</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-12 pe-5 ps-4">
                            <div className="col-12">
                                <div className="row p-md-3" style={{
                                    backgroundColor: "#F6F6F6",
                                    borderRadius: "30px",

                                }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img src="/images/privacy.png" />
                                        
                                    </div>
                                    <div className="col-12 py-md-3">
                                        <h5 className="d-flex justify-content-center" >Privacy-first Design</h5>
                                        {/* <p className="d-flex justify-content-center">Encrypt files, text, or data streams securely using AES-256.</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-12 pe-5 ps-4">
                            <div className="col-12">
                                <div className="row p-md-3" style={{
                                    backgroundColor: "#F6F6F6",
                                    borderRadius: "30px",

                                }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img src="/images/api.png" />
                                        
                                    </div>
                                    <div className="col-12 py-md-3">
                                        <h5 className="d-flex justify-content-center" > Full-featured API</h5>
                                        {/* <p className="d-flex justify-content-center">Encrypt files, text, or data streams securely using AES-256.</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-12 my-5 py-5">
                <div className="row text-center">
                    <div className="col-12 mb-5">
                    <h1><strong>Trusted By Developers & Privacy First-Teams</strong></h1>
                    <h5>Everything You Need for Secure, Seamless Encryption.</h5>
                    </div>

                    <div className="col d-flex justify-content-center align-items-center">
                    <img src="/images/logos_curl.png" className="img-fluid mx-5" alt="curl" style={{ maxHeight: "60px" }} />
                    <img src="/images/devicon-plain_docker-wordmark.png" className="img-fluid mx-5" alt="docker" style={{ maxHeight: "60px" }} />
                    <img src="/images/logos_openai.png" className="img-fluid mx-5" alt="openai" style={{ maxHeight: "60px" }} />
                    <img src="/images/mynaui_terminal-solid.png" className="img-fluid mx-5" alt="terminal" style={{ maxHeight: "60px" }} />
                    <img src="/images/uiw_github.png" className="img-fluid mx-5" alt="github" style={{ maxHeight: "60px" }} />
                    </div>
                </div>
            </div>

            <div className="col-12 my-5 pb-5">
                <div className="row">
                    <div className="col-12 my-3">
                        <h1 className="d-flex justify-content-center"><strong>How it Works</strong></h1>
                        <h5 className="d-flex justify-content-center mb-md-5">The Smartest Way to Encrypt Files, Text, and Data Streams."</h5>
                        <img src="/images/smartest_encrypt.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="col-12 my-5 pt-5">
                <div className="row">
                    <a href="#">
                        <div
                            className="text-white d-flex flex-column justify-content-center align-items-center text-center"
                            style={{
                                backgroundImage: "url('/images/built_for_developers.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                height: "600px", // or any preferred height
                                borderRadius: "30px", // optional, for rounded corners
                                boxShadow: "0px -40px 100px rgba(125, 120, 255, 0.5)", // optional, like you showed earlier
                            }}
                            >
                            {/* <h1 className="fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
                                Built for Developers, Trusted by Everyone
                            </h1> */}
                            {/* <button className="btn btn-primary px-5 py-3" style={{ fontWeight: "600" }}>
                                View Dashboard
                            </button> */}
                        </div>
                    </a>

                </div>
            </div>

           
        </div>
        
    )
}

export default Features;