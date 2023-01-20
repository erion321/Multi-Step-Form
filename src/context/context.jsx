import React from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const ContextProvider = ({ children }) => {
  /* State for the number of page so we can now wich 
  component to return */
  const [page, setPage] = useState(1);

  const monthlyPlan = [
    {
      plan: "Monthly",
      image: "images/icon-arcade.svg",
      type: "Arcade",
      price: 9,
      free: "",
    },
    {
      plan: "Monthly",
      image: "images/icon-advanced.svg",
      type: "Advanced",
      price: 12,
      free: "",
    },
    {
      plan: "Monthly",
      image: "images/icon-pro.svg",
      type: "Pro",
      price: 15,
      free: "",
    },
  ];
  const yearlyPlan = [
    {
      plan: "Yearly",
      image: "images/icon-arcade.svg",
      type: "Arcade",
      price: 90,
      free: "2 months free",
    },
    {
      plan: "Yearly",
      image: "images/icon-advanced.svg",
      type: "Advanced",
      price: 120,
      free: "2 months free",
    },
    {
      plan: "Yearly",
      image: "images/icon-pro.svg",
      type: "Pro",
      price: 150,
      free: "2 months free",
    },
  ];

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        monthlyPlan,
        yearlyPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
