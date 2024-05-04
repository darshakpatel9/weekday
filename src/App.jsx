import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import JobCard from "./Components/JobCard";
import Grid from "@mui/material/Grid";
import FilterPanel from "./Components/FilterPanel";

const limit = Math.floor(
  (window.innerHeight * window.innerWidth) / (275 * 450)
);

function App() {
  const [jobList, setJobList] = useState([]); // job list
  const [page, setPage] = useState(0); // current page according to visibale card during each api call

  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    roles: [],
  }); // Filter Options according to data coming from api
  const [appliedFilters, setAppliedFilters] = useState({
    roles: [],
    experience: {},
    remote: [],
    salary: {},
    companyName: "",
  });

  useEffect(() => {
    getJobList(page);
    window.addEventListener("scroll", handleScroll); // event listener for scroll
    return () => {
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, [page]);

  useEffect(() => {
    const uniqueRoles = new Set(jobList.map((job) => job.jobRole));
    setFilterOptions({
      roles: Array.from(uniqueRoles).map((role) => ({
        label: role,
        value: role,
      })),
    }); // set value for filter options in our case we only have one
  }, [jobList]);

  const handleFilterChange = (type, value) => {
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  }; // handle filter change

  const handleScroll = () => {
    /* check if we are at end of our document so then load extra jobs,
    and if some filter is applied and we scrolling but we have less card then viewport visiable then load
    more jobs and filter
    */
    if (
      window.innerHeight + Math.ceil(document.documentElement.scrollTop) <
        document.documentElement.offsetHeight ||
      window.innerHeight > document.documentElement.offsetHeight
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const getJobList = async (page) => {
    // get jobs api call
    setIsLoading(true);
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
    setIsLoading(false);
  };
  const checkJobFilter = (job) => {
    // filter logic to filter out data
    const roles = appliedFilters.roles.map((filter) => filter.value);
    const experience = appliedFilters.experience?.value;
    const remote = appliedFilters.remote.map((filter) => filter.value);
    const salary = appliedFilters?.salary?.value;
    const companyName = appliedFilters?.companyName;
    if (roles?.length > 0 && !roles.includes(job.jobRole)) {
      return false;
    }
    if (experience && job?.minExp <= experience) {
      return false;
    }
    if (
      remote?.length < 2 &&
      ((remote.includes("remote") && job?.location != "remote") ||
        (remote.includes("inoffice") && job?.location === "remote"))
    ) {
      return false;
    }
    if (salary && job?.minJdSalary < salary) {
      return false;
    }

    if (
      companyName &&
      job.companyName.toLowerCase().indexOf(companyName.toLowerCase()) === -1
    ) {
      return false;
    }
    return true;
  };
  return (
    <div className="joblist" style={{ overflowY: "auto" }}>
      <FilterPanel
        roles={filterOptions.roles}
        handleFilterChange={handleFilterChange}
      />
      <Grid
        sx={{ flexGrow: 1, flexWrap: "wrap" }}
        alignItems="flex-start"
        container
        spacing={2}
      >
        {jobList
          .filter((job) => {
            // Check if the job meets all the applied filter criteria then render the job list
            return checkJobFilter(job);
          })
          .map((job, index) => (
            <Grid item xs={12} lg={3} md={4} xl={2} key={index}>
              <JobCard key={job.jdUid} job={job} />
            </Grid>
          ))}
      </Grid>
      {isLoading && <div className="loader">Loading...</div>}
    </div>
  );
}

export default App;
