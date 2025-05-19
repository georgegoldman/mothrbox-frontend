import React from "react";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-primary h-[110px] w-[110px] animate-spin rounded-full border-b-[3px]" />
    </div>
  );
}
