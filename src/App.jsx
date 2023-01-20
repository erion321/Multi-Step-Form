import React from "react";
import FinishingUp from "./components/FinishingUp";
import Personalinfo from "./components/Personalinfo";
import PickAddons from "./components/PickAddons";
import SelelectPlan from "./components/SelelectPlan";
import { useGlobalContext } from "./context/context";

function App() {
  const { page } = useGlobalContext();

  //Number of pages
  const pageNums = [
    { num: 1, step: "STEP 1", type: "YOUR INFO" },
    { num: 2, step: "STEP 2", type: "SELECT PLAN" },
    { num: 3, step: "STEP 3", type: "ADD-ONS" },
    { num: 4, step: "STEP 4", type: "SUMMARY" },
  ];

  //Returning component based on the number of page
  const Page = () => {
    if (page === 1) {
      return <Personalinfo />;
    }
    if (page === 2) {
      return <SelelectPlan />;
    }
    if (page === 3) {
      return <PickAddons />;
    }
    if (page === 4) {
      return <FinishingUp />;
    }
  };

  return (
    <div className="md:h-screen md:flex md:items-center md:justify-center">
      <div className="flex flex-col items-center overflow-hidden md:flex-row md:h-3/4 md:w-[85%] lg:w-[68%] xl:w-[58%] md:bg-white md:rounded-xl md:p-5">
        <div className="flex gap-5 justify-center items-start h-[28vh] w-screen mx-auto bg-cover bg-center bg-no-repeat bg-[url(C:\Users\erion\Desktop\Multi-Step-Form\public\images\bg-sidebar-mobile.svg)] md:flex-col md:justify-start  md:h-full md:rounded-lg md:w-2/5 md:p-5 md:bg-[url(C:\Users\erion\Desktop\Multi-Step-Form\public\images\bg-sidebar-desktop.svg)]">
          {pageNums.map((pageNum, index) => {
            return (
              <div key={index} className="flex gap-3">
                <span
                  className={`${
                    page == pageNum.num
                      ? "bg-[var(--Pastel-blue)] text-black border-none"
                      : "text-white"
                  } mt-8 rounded-full w-10 h-10 flex items-center justify-center font-bold border md:mt-0`}
                >
                  {pageNum.num}
                </span>
                <div className="hidden md:flex md:flex-col">
                  <p className="text-[var(--Light-gray)] text-sm">
                    {" "}
                    {pageNum.step}{" "}
                  </p>
                  <h3 className="text-white font-semibold"> {pageNum.type} </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute top-[6.5rem] md:relative w-11/12 sm:w-5/6 md:flex md:items-start md:self-start md:px-4 md:top-0 md:h-full">
          {Page()}
        </div>
      </div>
    </div>
  );
}

export default App;
