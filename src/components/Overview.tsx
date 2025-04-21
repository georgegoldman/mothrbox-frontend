const Overview = () => {
    return (
        <div className="row mb-md-5 pb-md-5">
                <div className="col d-flex justify-content-center">
                    <img
                        src="/images/Overview.png"
                        alt="Overview"
                        style={{
                        height: "795px",
                        objectFit: "contain", // similar to background-size: contain
                        border: "10px solid #7D78FF",
                        backgroundColor: "white", // optional if you want white behind
                        borderRadius: "30px",
                        boxShadow: "0 -100px 200px -60px rgba(125, 120, 255, 0.6)"
                        }}
                    />
                    </div>
                </div>

    )
}

export default Overview;