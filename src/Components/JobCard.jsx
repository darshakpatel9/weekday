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
    <Card sx={{ width: 275, height: 450 }}>
      <CardHeader
        title={companyName}
        subheader={jobRole}
        avatar={<Avatar src={logoUrl} alt={companyName} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Estimate Salary : {minJdSalary}K$ - {maxJdSalary}K$
        </Typography>

        <Typography variant="h5" component="div">
          About Company
        </Typography>

        <Typography variant="body2" sx={{ overflow: "auto", height: 150 }}>
          <div>
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
          {minExp} years
        </Typography>
      </CardContent>
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button variant="contained">Easy Apply</Button>
      </CardActions>
    </Card>
  );
}
