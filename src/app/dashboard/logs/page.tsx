'use client';

import { useState } from 'react';


import TitleBar from "@/components/TitleBar";


export default function DecryptPage() {
    const [activities] = useState(
        Array.from({ length: 15 }, (_, i) => ({
          ip: '192.168.0.1',
          endpoint: i % 2 === 0 ? 'Encrypt' : 'Decrypt',
          date: '29-02-2025',
          status: 300
        }))
      );
    return (
        <>
        <div className="">
            <TitleBar title="API Usage Logs" />
            <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">API Activities</h2>
        <div>
          <button className="btn btn-primary me-2">
            <i className="bi bi-download me-1"></i> Download logs csv
          </button>
          <button className="btn btn-outline-light">
            <i className="bi bi-funnel me-1"></i> Filter
          </button>
        </div>
      </div>

      <div className="table-responsive border rounded shadow-sm">
        <table className="table table-dark table-hover table-striped align-middle mb-0">
          <thead className="table-dark border-bottom">
            <tr>
              <th scope="col">IP <span className="ms-1">&#x25B2;</span></th>
              <th scope="col">Endpoint <span className="ms-1">&#x25B2;</span></th>
              <th scope="col">Date <span className="ms-1">&#x25B2;</span></th>
              <th scope="col">Status <span className="ms-1">&#x25B2;</span></th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((log, index) => (
              <tr key={index}>
                <td>{log.ip}</td>
                <td>{log.endpoint}</td>
                <td>{log.date}</td>
                <td>{log.status}</td>
                <td>
                  <button className="btn btn-sm btn-outline-light me-2">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
        </>
    )
}