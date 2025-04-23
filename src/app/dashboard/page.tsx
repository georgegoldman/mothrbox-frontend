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
      <div>
                <TitleBar title="Usage Statistics" />
        
        <div className="p-3">
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
              
            </div>
          </div>
        </div>
        {/* Add dashboard widgets, cards, etc here */}
      </div>
    );
  }
  