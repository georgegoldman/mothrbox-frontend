export type CryptCardData = {
    title: string,
    amount: number,
    time: Date,
    bgColor: string,
    margin:string
}

export default function CryptCard ({data} : {data: CryptCardData}) {
    return (
        <div className="col-6 p-3">
            <div className={` ${data.bgColor} ${data.margin} rounded-4 col-12 p-3 `}
                style={{
                //   background: "linear-gradient(90deg, #6a5af9, #b56eff)"
                }}
                >
                  <div className="row text-white">
                    <div className="col-2">
                      <img src="/images/lock.png" alt="mothrbox_lock_icon" />
                    </div>
                    <div className="col-10">
                      <p><strong>{data.title}</strong></p>
                      <p className="fs-1"><strong>{data.amount}</strong></p>
                      <div className="row">
                          <div className="col-4 bg-primary rounded-5" >
                          <i className="fa-solid fa-arrow-trend-up"></i> + 28%
                          </div>
                          <div className="col">
                            <strong>{data.time.toDateString().toString()}</strong>
                          </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
        </div>
    )
}