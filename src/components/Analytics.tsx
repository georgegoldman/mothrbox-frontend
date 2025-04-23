"use client";

import { LineChart, Line, XAxis, YAxis, AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  {name: 'Mon', uv: 30, pv: 2400, amt: 2400},
  {name: 'Tue', uv: 35, pv: 2400, amt: 2400},
  {name: 'Wed', uv: 80, pv: 2400, amt: 2400},
  {name: 'thur', uv: 61, pv: 2400, amt: 2400},
  {name: 'fri', uv: 82, pv: 2400, amt: 2400},
  {name: 'sat', uv: 81, pv: 2400, amt: 2400},
  {name: 'sun', uv: 81, pv: 2400, amt: 2400}

];


export default function CardLineChart() {
  return (
    <>
    <div className="row">
      <div className="col-12 d-flex justify-content-between align-items-center">
        <div className="text-light col-3">
          <p>Analytics <br />
          <span style={{fontSize: 10}}>Calls Today:</span>  <span>356</span></p>
        </div>
        <div className=" col-9">
          <div className=" float-end pe-0">
            <div className="d-flex justify-content-end">
              <button className="btn rounded-pill btn-secondary dropdown-toggle me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                This month
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
              <button type="button" className="btn btn-none me-1"><i className="fa-solid fa-caret-left text-light"></i></button>
              <button type="button" className="btn btn-none me-1"><i className="fa-solid fa-caret-right text-light"></i></button>
            </div>

          </div>
        </div>
        <div className=""></div>
      </div>
      <div className="col-12">
        <div style={{ height: 300 }} className="col-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>    

      </div>
    </div>
    </>
  )
}
