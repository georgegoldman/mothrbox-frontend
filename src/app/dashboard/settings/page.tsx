'use client';

import { useState } from 'react';
import Image from 'next/image';

import TitleBar from "@/components/TitleBar";

export default function DecryptPage() {
    const [notifyOnQuota, setNotifyOnQuota] = useState(false);
    return (
        <>
        <div className="">
            <TitleBar title="Settings" />
            <div className="container py-4 d-flex justify-content-center">
      <div className="card bg-dark text-white p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="d-flex flex-column align-items-center text-center mb-3">
          <div className="position-relative">
            <Image
              src="/images/profilepicture.png"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-circle border"
            />
            <button className="btn btn-primary position-absolute bottom-0 end-0 rounded-circle p-1">
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
          <h4 className="mt-3 mb-0">Michael John</h4>
          <small className="text-secondary">michaeljohn@gmail.com</small>
        </div>

        <div className="mb-3">
          <button className="btn btn-outline-light w-100">
            <i className="bi bi-key me-2"></i> Reset Password
          </button>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="quotaAlert"
            checked={notifyOnQuota}
            onChange={(e) => setNotifyOnQuota(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="quotaAlert">
            Email me when my usage exceeds 80% of quota
          </label>
        </div>

        <button className="btn w-100" style={{ background: 'linear-gradient(to right, #7B61FF, #9873F6)', color: '#fff' }}>
          Save changes
        </button>
      </div>
    </div>
        </div>
        </>
    )
}