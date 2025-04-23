"use client"


import MdTextField from "@/components/material_ui/MdTextField";
import TitleBar from "@/components/TitleBar";

export default function EncryptPage() {
    return (
      <>
      <div className="">
        <TitleBar title="Dashboard" />
        <h1>Encrypt a Message</h1>
        <form>
          {/* Your encryption form here */}
        </form>
      </div>

      <style jsx>{`
        .form-control::placeholder {
          color: white;
          opacity: 0.8;
        }
      `}
      </style>
      </>
    );
  }
  