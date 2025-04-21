"use client"
import Header from "@/components/Header";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import LandinPage from "../components/LandingPage";
import Overview from "../components/Overview";
import Features from "../components/Features";
import Footer from "../components/Footer";


const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    document.body.classList.add("opacity-100");
    return () => {
      document.body.classList.remove("opacity-100");
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
            </div>
            <div className="col-12">
              <LandinPage />

              <Overview />

              <Features />
              
            </div>
            <div className="col"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
