import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

const maxChars = 100;
export default function JobCard({
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  maxExp,
  minExp,
  jobRole,
  companyName,
  logoUrl,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={companyName}
        subheader={jobRole}
        avatar={<img src={logoUrl} alt={companyName} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Estimate Salary : {minJdSalary}K$ - {maxJdSalary}K$
        </Typography>

        <Typography variant="h5" component="div">
          About Company
        </Typography>

        <Typography variant="body2">
          {jobDetailsFromCompany}
          {jobDetailsFromCompany.length <= maxChars || isExpanded ? (
            <p>{jobDetailsFromCompany}</p>
          ) : (
            <div>
              <p>{`${jobDetailsFromCompany.slice(0, maxChars)}...`}</p>
              <button onClick={toggleExpansion}>
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Minimum Exeperince
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {minExp} years
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Easy Apply</Button>
      </CardActions>
    </Card>
  );
}
