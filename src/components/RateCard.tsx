export type RateCardData  = {
    image: string,
    title: string,
    count: number,
    bgColor: string
}

export default function RateCard ({data} : {data: RateCardData}) {
    return (
        <>
            <div className="col-4  p-3">
                <div className={`col-12 ${data.bgColor} rounded-4 p-3`}>
                <div className="row text-white">
                    <div className="col-2">
                      <img src={`/images/${data.image}`} alt="mothrbox_lock_icon" />
                    </div>
                    <div className="col-10">
                      <p><strong>{data.title}</strong></p>
                      <p className="fs-1"><strong>{data.count}</strong></p>
                      
                    </div>
                    
                  </div>
                </div>
            </div>
        </>
    )
}