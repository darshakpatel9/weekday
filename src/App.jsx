import { useEffect, useRef, useState } from "react";
import "./App.css";
import JobCard from "./Components/JobCard";
import Grid from "@mui/material/Grid";

const limit = 10;

function App() {
  const [jobList, setJobList] = useState([]);
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    getJobList(page);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  const handleScroll = () => {
    console.log("innerHigr : " + window.innerHeight);
    console.log("scrollTop : " + document.documentElement.scrollTop);
    console.log("offset : " + document.documentElement.offsetHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop !=
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const getJobList = async (page) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: limit,
      offset: page * limit,
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
    setJobList((prevJobs) => [...prevJobs, ...jobs.jdList]);
  };

  return (
    <div className="job-list" ref={containerRef} style={{ overflowY: "auto" }}>
      <Grid
        sx={{ flexGrow: 1, flexWrap: "wrap" }}
        alignItems="flex-start"
        container
        spacing={2}
      >
        {jobList.map((job, index) => (
          <Grid item xs={12} lg={3} md={4} xl={2} key={index}>
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
