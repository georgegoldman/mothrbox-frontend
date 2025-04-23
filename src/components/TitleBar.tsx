import React from "react";

export default function TitleBar({title}:{title: string}) {
    return (
        <>
        <div className="col-12 bg-black border-1 border-top border-bottom border-light-emphasis border-end p-4 text-white d-flex justify-content-between align-items-center" style={{height: "100px"}}>
              <div className="col-3">
                <h3><strong>{title}</strong></h3>
              </div>
              <div className="col-9">
                <div className="row">
                  <div className="col-7">
                  {/* <md-outlined-text-field></md-outlined-text-field> */}
                  <div className="input-group text-white mt-2">
                    <span className="input-group-text border-end-0 border-dark  bg-dark rounded-start-pill">
                      <i className="fas fa-search text-white"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg border-start-0 border-dark bg-dark white-placeholder text-white rounded-end-pill shadow-none"
                      placeholder="Search..."
                      aria-label="Search"
                    />
                  </div>

                  </div>
                  <div className="col-5">
                    <div className="row">
                      <div className="col-4">
                        <button className="btn btn-link rounded-circle" type="button">
                          <img src="/images/notification.png" alt="" />
                        </button>
                      </div>

                      <div className="col-8">
  <div className="nav-item dropdown py-3 ps-3 pe-4 border rounded-pill bg-black">
    <a
      className="nav-link d-flex align-items-center gap-3 text-white"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <div>
        <img
          src="/images/profile.png"
          alt="Profile"
          className="rounded-circle"
          width="50"
          height="50"
        />
      </div>
      <div className="text-start">
        <span className="fs-6 fw-bold d-block">Michael John</span>
        <span className="text-light-emphasis small">Michealjohn@gmail.com</span>
      </div>
      <div className="ms-auto">
        <i className="fas fa-chevron-down"></i>
      </div>
    </a>
    <ul className="dropdown-menu">
      <li><a className="dropdown-item" href="#">Action</a></li>
      <li><a className="dropdown-item" href="#">Another action</a></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a className="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
</div>
 
                  </div>

                                 

                  </div>
                </div>
              </div>
        </div>
        </>
    )
}