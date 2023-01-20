import React from "react";
import { useGlobalContext } from "../context/context";

const ThankYou = () => {
  const { monthlyPlan } = useGlobalContext();
  //Reseting items in local storage
  localStorage.setItem("planType", JSON.stringify("Monthly"));
  localStorage.setItem("plan", JSON.stringify(monthlyPlan[0]));
  localStorage.setItem("planValue", JSON.stringify(0));
  localStorage.setItem("addOns", JSON.stringify([]));
  localStorage.setItem(
    "checked",
    JSON.stringify([{ checked: false }, { checked: false }, { checked: false }])
  );

  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-lg px-5 py-14">
      <img src="images/icon-thank-you.svg" className="w-16 h-16" alt="" />
      <h2 className="text-2xl font-bold text-[var(--Marine-blue)]">
        Thank You!
      </h2>
      <p className="text-[var(--Cool-gray)] text-lg text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
};

export default ThankYou;
