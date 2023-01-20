import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { BsCheck } from "react-icons/bs";

const getChecked = () => {
  let checked = localStorage.getItem("checked");
  if (checked) {
    return JSON.parse(localStorage.getItem("checked"));
  } else {
    return [{ checked: false }, { checked: false }, { checked: false }];
  }
};

function getAddons() {
  let addOns = localStorage.getItem("addOns");
  if (addOns) {
    return JSON.parse(localStorage.getItem("addOns"));
  } else {
    return [];
  }
}

export default function PickAddons() {
  const { page, setPage } = useGlobalContext();
  //State of add-ons
  const [addOns, setAddons] = useState(getAddons());
  //Storing if an addon is checked for the check buttons
  const [checked, setChecked] = useState(getChecked());
  const planType = JSON.parse(localStorage.getItem("planType"));

  const monthlyAddOns = [
    {
      type: "Online service",
      price: 1,
      persc: "Access to multiplayer games",
    },
    {
      type: "Larger storage",
      price: 2,
      persc: "Extra 1TB of cloud save",
    },
    {
      type: "Costomizable profile",
      price: 2,
      persc: "Custom theme on your profile",
    },
  ];

  const yearlyAddOns = [
    {
      type: "Online service",
      price: 10,
      persc: "Access to multiplayer games",
    },
    {
      type: "Larger storage",
      price: 20,
      persc: "Extra 1TB of cloud save",
    },
    {
      type: "Costomizable profile",
      price: 20,
      persc: "Custom theme on your profile",
    },
  ];

  //Adding an add-on to state and checking if already exist
  const verifyAddon = (addOn, index) => {
    const newChecked = [...checked];
    if (addOns.length >= 1) {
      const compareAddon = addOns.map((addOn) => addOn.type);
      if (compareAddon.includes(addOn.type)) {
        const filterAddons = addOns.filter((plan) => plan.type !== addOn.type);
        newChecked[index].checked = false;
        setChecked(newChecked);
        return setAddons(filterAddons);
      }
      newChecked[index].checked = true;
      setChecked(newChecked);
      return setAddons([...addOns, addOn]);
    } else {
      newChecked[index].checked = true;
      setChecked(newChecked);
      return setAddons([...addOns, addOn]);
    }
  };

  //adding check to state and verifyink if already exist
  const checkAddOns = () => {
    if (addOns.length >= 1) {
      const filterAddons = addOns.map((addOn) => addOn.type);
      if (planType == "Monthly") {
        const filterAddon = monthlyAddOns.filter((addOn) =>
          filterAddons.includes(addOn.type)
        );
        return setAddons(filterAddon);
      }
      const filterAddon = yearlyAddOns.filter((addOn) =>
        filterAddons.includes(addOn.type)
      );
      return setAddons(filterAddon);
    }
  };

  useEffect(() => {
    checkAddOns();
  }, [planType]);

  useEffect(() => {
    localStorage.setItem("addOns", JSON.stringify(addOns));
    localStorage.setItem("checked", JSON.stringify(checked));
  }, [addOns, checked]);

  function addOnPlan() {
    if (planType == "Monthly") {
      return monthlyAddOns;
    }
    return yearlyAddOns;
  }

  return (
    <section className="flex flex-col gap-3 bg-white p-5 rounded-lg md:w-full md:relative md:h-full">
      <div>
        <h1 className="text-2xl font-bold text-[var(--Marine-blue)] mb-2">
          Pick add-ons
        </h1>
        <h3 className="text-lg font-medium text-[var(--Cool-gray)]">
          Add-ons help enhance your gaming experince.
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {addOnPlan().map((plan, index) => {
          return (
            <div
              key={index}
              onClick={() => verifyAddon(plan, index)}
              className={`flex items-center justify-between border rounded-lg p-2 cursor-pointer                
                ${
                  checked[index].checked == true &&
                  "border-[var(--Purplish-blue)] bg-[var(--Magnolia)]"
                }`}
            >
              <div className="flex items-center gap-5">
                <button
                  onClick={() => verifyAddon(plan, index)}
                  className={`h-5 w-5 border rounded transition-all ease-in-out delay-100 text-white ${
                    checked[index].checked == true &&
                    "bg-[var(--Purplish-blue)]"
                  }`}
                >
                  {checked[index].checked == true ? <BsCheck /> : ""}
                </button>
                <div>
                  <h4 className="font-bold text-[var(--Marine-blue)]">
                    {plan.type}
                  </h4>
                  <p className="text-[var(--Cool-gray)]"> {plan.persc} </p>
                </div>
              </div>
              <span className="text-[var(--Purplish-blue)]">
                +${plan.price}
                {planType == "Monthly" ? "/mo" : "/yr"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 right-0 w-full bg-white p-5 flex justify-between md:absolute md:bg-transparent md:p-0">
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
