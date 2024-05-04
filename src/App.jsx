import { useEffect, useState } from "react";
import "./App.css";
import JobCard from "./Components/JobCard";
import Grid from "@mui/material/Grid";
function App() {
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    getJobList();
  });
  const getJobList = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 100,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const jobs = await response.json();
    setJobList(jobs.jdList);
  };
  return (
    <div className="job-list">
      <Grid
        sx={{ flexGrow: 1, flexWrap: "wrap" }}
        alignItems="flex-start"
        container
        spacing={2}
      >
        {jobList.map((job) => (
          <Grid item>
            <JobCard
              jobDetailsFromCompany={job.jobDetailsFromCompany}
              maxJdSalary={job.maxJdSalary}
              minJdSalary={job.minJdSalary}
              salaryCurrencyCode={job.salaryCurrencyCode}
              location={job.location}
              minExp={job.minExp}
              maxExp={job.maxExp}
              jobRole={job.jobRole}
              companyName={job.companyName}
              logoUrl={job.logoUrl}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
