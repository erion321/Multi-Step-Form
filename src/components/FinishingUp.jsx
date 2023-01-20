import React, { useState } from "react";
import { useGlobalContext } from "../context/context";
import ThankYou from "./ThankYou";

export default function FinishingUp() {
  const { page, setPage } = useGlobalContext();
  //Tahnks component
  const [thanksPage, setThanksPage] = useState(false);
  const addOns = JSON.parse(localStorage.getItem("addOns"));
  const plan = JSON.parse(localStorage.getItem("plan"));
  const planType = JSON.parse(localStorage.getItem("planType"));

  //Total price of add-ons and plan
  const totalPrice = () => {
    if (addOns.length >= 1) {
      const addOnPrice = addOns.map((addOn) => addOn.price);
      return plan.price + addOnPrice.reduce((a, b) => a + b);
    }
    return plan.price;
  };

  if (thanksPage) {
    return <ThankYou />;
  }

  return (
    <section className="bg-white p-5 rounded-lg flex flex-col gap-3 md:relative md:h-full">
      <div>
        <h2 className="text-2xl font-bold text-[var(--Marine-blue)]">
          Finishing up
        </h2>
        <h3 className="text-lg text-[var(--Cool-gray)] md:text-md">
          Double-check everything looks OK before confirming
        </h3>
      </div>
      <div className="bg-[var(--Magnolia)] p-3 rounded-lg flex flex-col gap-3">
        <div className="flex items-center justify-between border-b-2 p-1">
          <div>
            <h4 className="text-[var(--Marine-blue)] font-bold">
              {plan.type} ({planType})
            </h4>
            <button
              onClick={() => setPage(2)}
              className="m-0 p-0 border-b-2 border-[var(--Marine-blue)]  font-semibold text-[var(--Cool-gray)]"
            >
              Change
            </button>
          </div>
          <span className="text-[var(--Marine-blue)] font-bold">
            ${plan.price}
            {planType == "Monthly" ? "/mo" : "/yr"}
          </span>
        </div>

        {addOns.map((addOn, index) => {
          totalPrice(addOn.price);
          return (
            <div key={index} className="flex justify-between">
              <p className="text-[var(--Cool-gray)]  font-semibold">
                {addOn.type}
              </p>
              <span className="text-[var(--Marine-blue)] font-semibold">
                +${addOn.price}
                {planType == "Monthly" ? "/mo" : "/yr"}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <p className="text-[var(--Cool-gray)]  font-semibold">
          Total ({planType == "Monthly" ? "per month" : "per year"})
        </p>
        <span className="text-[var(--Purplish-blue)] font-bold">
          ${totalPrice()}
          {planType == "Monthly" ? "/mo" : "/yr"}
        </span>
      </div>

      <div className="fixed bottom-0 right-0 w-full bg-white p-5 flex justify-between md:absolute md:bg-transparent">
        <button
          className="text-[var(--Cool-gray)] p-2"
          onClick={() => setPage(page - 1)}
        >
          Go Back
        </button>
        <button
          className="bg-[var(--Purplish-blue)] text-white text-bold rounded py-2 px-3"
          onClick={() => setThanksPage(true)}
        >
          Confirm
        </button>
      </div>
    </section>
  );
}
