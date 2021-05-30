import React from "react";
import { Typography, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { db } from "../firebase";

function JobCard({ job }) {
 
 
  const handleStatusChange = (e) => {
   
    
    db.jobs
      .doc(job.name)
      .update({
        status: e.target.value,
      })
      .then(() => {
        console.log("Document updated with ID: ", job.name);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <Grid item sm={6} xs={12} id={job.createdAt} key={job.createdAt}>
      <Typography variant="body1" color="textSecondary">
        Date Applied for: {job.date}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Type of Work: {job.type}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Name of Company: {job.name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Address of Company: {job.address}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Person Contacted: {job.person}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Phone Number: {job.phone}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Method of Contact: {job.method}
      </Typography>
      {job.email ? (
        <Typography variant="body1" color="textSecondary">
          Email of Contact: {job.email}
        </Typography>
      ) : null}
      <Typography variant="body1" color="textSecondary">
        Results of Contact: {job.results}
      </Typography>
      <FormControl id="status">
        <InputLabel>Current Status</InputLabel>
        <Select
          onChange={handleStatusChange}
          aria-describedby="status-helper-text"
          required
          value={job.status}
        >
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Denied"}>Denied</MenuItem>
          <MenuItem value={"Interview"}>Interview</MenuItem>
          <MenuItem value={"Offer"}>Offer</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        <FormHelperText id="status-helper-text">
          Chnage to update the current status.
        </FormHelperText>
      </FormControl>
      <Typography variant="body1" color="textSecondary">
        Listing Website:{" "}
        <a href={job.listing} target="_blank" rel="noreferrer">
          Link
        </a>
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Additonal Info: {job.additonal}
      </Typography>
    </Grid>
  );
}

export default JobCard;
