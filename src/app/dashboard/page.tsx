import CryptCard from "@/components/CryptCard";
import TitleBar from "@/components/TitleBar";
import { CryptCardData } from "@/components/CryptCard";
import RateCard, { RateCardData } from "@/components/RateCard";
import AnalyticBar from "@/components/AnalyticsBar";

export default function DashboardHomePage() {

  const encrypt: CryptCardData  = {
    title: "Encrypted File",
    amount: 25000,
    time: new Date(Date.now()),
    bgColor: "crypt-card-encrypt",
    margin: ""
  }
  const decrypt: CryptCardData  = {
    title: "Decrypted File",
    amount: 10000,
    time: new Date(Date.now()),
    bgColor: "bg-dark",
    margin: ""
  }

  const call: RateCardData = {
    image: "call.png",
    title: "Calls Today",
    count: 150,
    bgColor: "bg-dark"
  }

  const quote: RateCardData = {
    image: "quote.png",
    title: "Quota Left",
    count: 850,
    bgColor: "bg-dark"
  }

  const rate: RateCardData = {
    image: "rate.png",
    title: "Rate Limit",
    count: 1000,
    bgColor: "bg-dark"
  }


    return (
      <div className="">
        <TitleBar title="Usage Statistics" />
        
        <div className="p-3 bg border-top">
          <div className="row">
            <div className="col-7 p-3 ">
              <div className="row">
                <CryptCard data= {encrypt} />
                {/* <div className="col"></div> */}
                
                <CryptCard data= {decrypt} />
              </div>
              <div className="row">
                <RateCard data={call} />
                <RateCard data={quote} />
                <RateCard data={rate} />
              </div>
              <div className="row">
                <AnalyticBar />
              </div>
            </div>
            <div className="col-5 p-3 ">
              <div className="row">
                <div className="col-12 p-3">
                  <div className="col-12 bg-dark text-light rounded-4 p-3" style={{border: "solid 2px #7D78FF78"}}>
                    <p className="py-2"><strong>Your API key</strong></p>
                    <div className="col-12 border rounded-1 mb-3 border-light py-1 px-2
                     d-flex justify-content-between"
                     style={
                      {
                        height: "35px"
                      }
                     }
                     >
                      <p><i className="fa-solid fa-folder-open"></i>.env.local</p>
                      <p className="text-primary">
                        <i className="fa-solid fa-link"></i>
                        copy
                      </p>
                    </div>
                    <p className=" rounded-pill py-2 d-inline-flex align-items-center gap-2">
                    <i className="fa-solid fa-circle-exclamation"></i>
                      Regenerate your key if suspect any compromise
                    </p>
                    <div className="col-12">
                      <button type="button" className="btn col-12 mothrbox-btn-color btn-lg text-light fs-6" 
                      
                      >Generate new key</button>
                    </div>

                  </div>
                  
                </div>
                <div className="col-12 p-3">
                  <div className="col-12 bg-dark text-light rounded-4 p-3" style={{border: "solid 2px #7D78FF78"}}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="py-2 fs-4"><strong>STAT</strong></p>
                      <p>This month</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <img src="/images/stat.png" alt="" />
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className=" px-5 col-12">
                        <div className="px-5 d-flex justify-content-around col-12">
                          <div className="d-flex align-items-center">
                          <span className="material-symbols-outlined me-1"
                          style={{
                            color: "#D200FD"
                          }}
                          >radio_button_unchecked</span>
                            Calls Today
                          </div>
                          <div className="">150</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <div className=" px-5 col-12">
                        <div className="px-5 d-flex justify-content-around  col-12">
                          <div className="d-flex align-items-center"> 
                          <span className="material-symbols-outlined me-1"
                              style={{
                                color: "#0717CD"
                              }}
                              >radio_button_unchecked</span>
                            Calls Today
                          </div>
                          <div className="">150</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex pb-2 justify-content-center">
                      <div className=" px-5 col-12">
                        <div className="px-5 d-flex justify-content-around col-12">
                          <div className="d-flex align-items-center">
                          <span className="material-symbols-outlined me-1"
                          style={{
                            color: "#7D78FF"
                          }}
                          >radio_button_unchecked</span>
                            Calls Today
                            </div>
                          <div className="">150</div>
                        </div>
                      </div>
                    </div>

                    
                    
                    <div className="col-12">
                      <button type="button" className="btn col-12 mothrbox-btn-color btn-lg text-light fs-6" 
                      
                      >View API Docs</button>
                    </div>

                  </div>
                  
                </div>

                <p className="py-2 text-light fs-4"><strong>History</strong></p>
                <div className="px-3">
                  <div className="col-12 bg-dark text-light rounded-4 mb-3 p-3" style={{border: "solid 2px #7D78FF78"}}>
                      <p className="py-2 col-2 bg-danger rounded-4 d-flex justify-content-center"><strong>Cancelled</strong></p>
                      <div className="col-12  mb-3 border-light py-1 px-2
                      d-flex justify-content-between"
                      style={
                        {
                          height: "35px"
                        }
                      }
                      >
                        <p><i className="fa-solid fa-folder-open"></i>File-Hfgvehbejj4y7567.pdf <br /> 29-02-2025</p>
                        <p className="">
                          AES
                        </p>
                      </div>

                  </div>
                </div>

                <div className="px-3">
                  <div className="col-12 bg-dark text-light rounded-4 p-3" style={{border: "solid 2px #7D78FF78"}}>
                      <p className="py-2 col-2 bg-success rounded-4 d-flex justify-content-center"><strong>Cancelled</strong></p>
                      <div className="col-12  mb-3 border-light py-1 px-2
                      d-flex justify-content-between"
                      style={
                        {
                          height: "35px"
                        }
                      }
                      >
                        <p><i className="fa-solid fa-folder-open"></i>File-Hfgvehbejj4y7567.pdf <br /> 29-02-2025</p>
                        <p className="">
                          AES
                        </p>
                      </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add dashboard widgets, cards, etc here */}
      </div>
    );
  }
  