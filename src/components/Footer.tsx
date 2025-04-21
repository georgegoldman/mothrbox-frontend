const Footer = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-4">
                    <h3><strong>Mothrbox</strong></h3>
                    <p>The Easiest Way to Encrypt, Share, and Protect Your Data, <br />
                    Simple Tools for Complex Security Problems. </p>
                    <div className="my-5"></div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4 d-flex justify-content-center">
                                {/* <a href="#" className="text-black"><i className="fa-brands fa-instagram me-3"></i></a> */}
                                <a href="#" className="text-black"><i className="fa-brands fa-2x text-black fa-twitter me-3"></i></a>
                                {/* <a href="#" className="text-black"><i className="fa-brands fa-linkedin me-3"></i></a> */}
                            </div>
                        </div>
                    </div>
                    <div className="my-5"></div>
                    <p>© 2025 Cryptix. All rights reserved.</p>
                </div>
                <div className="col-4">
                    <h5><strong>Links</strong></h5>
                    <a className="nav-link text-black my-3" href="https://github.com/georgegoldman/mothrbox" >Doc</a> 
                    <a className="nav-link text-black my-3" href="mailto:mothrbox.gold@gmail.com">mothrbox.gold@gmail.com</a>
                    <a className="nav-link text-black my-3" target='blank' href="https://github.com/georgegoldman/mothrbox">https://github.com/georgegoldman/mothrbox</a>
                    <a className="nav-link text-black my-3" href="/pdf/📄 Mothrbox_Terms_of_Service.pdf" target="_blank" rel="noopener noreferrer">Terms & Privacy</a>
                </div>
                <div className="col-4">
                <h5><strong>Links</strong></h5>
                    <p className="nav-link text-black my-3" >Newsletter</p> 
                    <p className=" my-3" >Stay updated with everything related to Mothrbox</p>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Email" />
                        <button className="btn btn-outline-secondary" type="submit">Subscribe</button>
                    </form>
                    <p className="my-3">By signing up you agree to our privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;