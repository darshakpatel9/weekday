import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function FilterPanel({ roles, handleFilterChange }) {
  /* Have added 5 filters
    - roles
    - experience
    - remote
    - location
    - salary
  and added some options static and some dyanmic
  */
  return (
    <div className="filterPanel">
      <Autocomplete
        disablePortal
        id="roles"
        multiple
        options={roles}
        sx={{ minWidth: 150 }}
        onChange={(event, value) => handleFilterChange("roles", value)}
        renderInput={(params) => <TextField {...params} label="roles" />}
      />
      <Autocomplete
        disablePortal
        id="experience"
        options={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
          { label: "7", value: 7 },
          { label: "8", value: 8 },
        ]}
        sx={{ width: 150 }}
        onChange={(event, value) => handleFilterChange("experience", value)}
        renderInput={(params) => <TextField {...params} label="Experience" />}
      />
      <Autocomplete
        disablePortal
        id="remote"
        options={[
          { label: "Remote", value: "remote" },
          { label: "InOffice", value: "inoffice" },
        ]}
        sx={{ minWidth: 200 }}
        onChange={(event, value) => handleFilterChange("remote", value)}
        multiple
        renderInput={(params) => <TextField {...params} label="Remote" />}
      />
      <Autocomplete
        disablePortal
        id="minimumbasesalary"
        options={[
          { label: "0K", value: 0 },
          { label: "10K", value: 10 },
          { label: "20K", value: 20 },
          { label: "30K", value: 30 },
          { label: "40K", value: 40 },
          { label: "50K", value: 50 },
          { label: "60K", value: 60 },
          { label: "70K", value: 70 },
          { label: "80K", value: 80 },
          { label: "90K", value: 90 },
          { label: "100K", value: 100 },
          { label: "110K", value: 110 },
          { label: "120K", value: 120 },
          { label: "130K", value: 130 },
          { label: "140K", value: 140 },
          { label: "150K", value: 150 },
          { label: "160K", value: 160 },
          { label: "170K", value: 170 },
          { label: "180K", value: 180 },
          { label: "190K", value: 190 },
          { label: "200K", value: 200 },
        ]}
        onChange={(event, value) => handleFilterChange("salary", value)}
        sx={{ width: 200 }}
        renderInput={(params) => (
          <TextField {...params} label="Minimum Base Salary" />
        )}
      />
      <TextField
        label="Company Name"
        onChange={(event) =>
          handleFilterChange("companyName", event.target.value)
        }
      />
    </div>
  );
}

export default FilterPanel;
