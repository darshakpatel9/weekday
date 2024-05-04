import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
const maxChars = 200;
export default function JobCard({ job }) {
  const {
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
  } = job; // JOB Details
  const [isExpanded, setIsExpanded] = React.useState(false); // if About Section is Expanded

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ width: 275, height: 450 }}>
      <CardHeader
        title={companyName}
        subheader={
          <>
            <span className="jobRoleTitle">{jobRole}</span>
            <br />
            {location}
          </>
        }
        avatar={<Avatar src={logoUrl} alt={companyName} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {` Estimate Salary : ${minJdSalary ? minJdSalary + "K$ -" : ""}  ${
            maxJdSalary ? maxJdSalary + "K$ " : ""
          }`}
        </Typography>

        <Typography variant="h6" component="div">
          About Company:
        </Typography>

        <Typography variant="body2" sx={{ overflow: "auto", height: 150 }}>
          <div>
            {/* 
              if is less than maxChars then show truncated else show full text
            */}
            {jobDetailsFromCompany.length <= maxChars || isExpanded ? (
              <>
                {jobDetailsFromCompany}
                <br />

                {jobDetailsFromCompany.length > maxChars && (
                  <Link onClick={toggleExpansion}>
                    {isExpanded ? "Show Less" : "Show More"}
                  </Link>
                )}
              </>
            ) : (
              <div>
                {`${jobDetailsFromCompany.slice(0, maxChars)}...`}
                <br />
                <Link onClick={toggleExpansion}>
                  {isExpanded ? "Show Less" : "Show More"}
                </Link>
              </div>
            )}
          </div>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          Minimum Exeperince
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {minExp || 0} years
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button variant="contained">Easy Apply</Button>
      </CardActions>
    </Card>
  );
}
