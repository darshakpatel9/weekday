import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import JobCard from "./Components/JobCard";

function App() {
  return (
    <>
      <JobCard
        jobDetailsFromCompany="This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment."
        maxJdSalary={28}
        minJdSalary={26}
        salaryCurrencyCode="USD"
        location="remote"
        minExp={2}
        maxExp={11}
        jobRole="android"
        companyName="Sony"
        logoUrl="https://logo.clearbit.com/sony.com"
      />
    </>
  );
}

export default App;
