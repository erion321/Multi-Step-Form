import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";

//Getting the index of plan from local storage
const getPlanValue = () => {
  let planValue = localStorage.getItem("planValue");
  if (planValue) {
    return JSON.parse(localStorage.getItem("planValue"));
  } else {
    return 0;
  }
};

//Geting the type of plan from local storage
const getPlanType = () => {
  let planType = localStorage.getItem("planType");
  if (planType) {
    return JSON.parse(localStorage.getItem("planType"));
  } else {
    return "Monthly";
  }
};

export default function SelelectPlan() {
  const { page, setPage, monthlyPlan, yearlyPlan } = useGlobalContext();

  //Geting plan from local storage
  const getPlan = () => {
    const plan = localStorage.getItem("plan");
    if (plan) {
      return JSON.parse(localStorage.getItem("plan"));
    } else {
      return monthlyPlan[0];
    }
  };
  //plan from monthlyPlan or yearlyPlan
  const [plan, setPlan] = useState(getPlan());
  //Plan type monthly or yearly
  const [planType, setPlanType] = useState(getPlanType());
  //Index of plan
  const [planValue, setPlanValue] = useState(getPlanValue());

  //setting plan an planValue
  const addPlan = (plan, index) => {
    setPlanValue(index);
    return setPlan(plan);
  };

  /* When we change plan type we want the same plan
  ex. advanced-monthly to advanced-yearly 
   this was a problem in local storage */
  const changePlan = () => {
    if (planType == "Monthly") {
      setPlan(yearlyPlan[planValue]);
      return setPlanType("Yearly");
    }
    setPlan(monthlyPlan[planValue]);
    return setPlanType("Monthly");
  };
  //Selecting which array of plan from context
  const selectPlan = () => {
    if (planType == "Monthly") {
      return monthlyPlan;
    }
    return yearlyPlan;
  };

  useEffect(() => {
    localStorage.setItem("plan", JSON.stringify(plan));
    localStorage.setItem("planValue", JSON.stringify(planValue));
    localStorage.setItem("planType", JSON.stringify(planType));
  }, [plan, planType]);

  return (
    <section className=" bg-white rounded-lg p-5 flex flex-col gap-8 mb-8 md:relative md:mb-0 md:gap-0 md:justify-between md:h-full md:w-full">
      <article className="flex flex-col items-center gap-4 w-full md:items-start md:gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[var(--Marine-blue)]">
            Selelect your plan
          </h1>
          <h3 className="text-[var(--Cool-gray)] text-lg font">
            You have the option of monthly or yearly billing.
          </h3>
        </div>
        <div className="flex flex-col gap-4 w-full p-4 md:flex-row md:px-0 md:justify-between md:gap-2">
          {selectPlan().map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => addPlan(item, index)}
                className={`${
                  planValue == index &&
                  "border-[var(--Marine-blue)] bg-[var(--Magnolia)] transition ease-in-out delay-200"
                } flex items-start gap-3 p-3 border  rounded-lg cursor-pointer transition-all overflow-hidden md:flex-col md:items-center md:px-2
                ${
                  planType == "Monthly"
                    ? "h-[4.1rem] md:h-[7.2rem]"
                    : "h-24 md:h-[8.7rem]"
                }`}
              >
                <img src={item.image} alt="" />
                <div>
                  <h3 className="font-bold text-[var(--Marine-blue)]">
                    {item.type}
                  </h3>
                  <p className="text-[var(--Cool-gray)]">
                    ${item.price}
                    {planType == "Monthly" ? "/mo" : "/yr"}
                  </p>
                  <p className="text-[var(--Marine-blue)] font-medium md:text-sm">
                    2 months free
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          onClick={() => {
            changePlan();
          }}
          className="flex items-center p-3 px-6 rounded-xl gap-4 bg-[var(--Magnolia)]  transition ease-in-out delay-200 md:absolute md:top-[70%] md:self-center"
        >
          <h3 className="font-bold text-[var(--Marine-blue)]">Monthly</h3>
          <div className="bg-[var(--Marine-blue)] h-5 w-10 rounded-3xl relative cursor-pointer">
            <span
              className={`bg-white h-4 w-4 absolute rounded-full top-[50%] left-[50%] translate-y-[-50%] transition ease-in-out delay-100 ${
                planType == "Monthly"
                  ? "translate-x-[-105%]"
                  : "translate-x-[10%]"
              }`}
            ></span>
          </div>
          <h3 className="font-bold text-[var(--Cool-gray)]">Yearly</h3>
        </div>
      </article>
      <div className="flex justify-between md:w-full md:absolute md:bottom-0 md:left-0">
        <button
          className="text-[var(--Cool-gray)] p-2"
          onClick={() => setPage(page - 1)}
        >
          Go Back
        </button>
        <button
          className="bg-[var(--Marine-blue)] text-white text-bold rounded p-2"
          onClick={() => setPage(page + 1)}
        >
          Next Step
        </button>
      </div>
    </section>
  );
}
