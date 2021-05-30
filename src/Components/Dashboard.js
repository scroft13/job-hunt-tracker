import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Container } from "@material-ui/core";
import { AddJobDialog } from "./AddJobDialog";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { Typography, Grid } from "@material-ui/core";
import JobCard from "./JobCard";

const useStyles = makeStyles({
  dashRoot: {
    height: "100%",
  },
  jobCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    margin: "10px",
  },
});

function Dashboard() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);

  const loadJobs = useCallback(() => {
    db.jobs
      .orderBy("name")
      .where("user", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push(...jobs, doc.data());
        });
        setJobs(result);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.dashRoot}>
      <Button color="primary" variant="contained" onClick={handleClick}>
        Add Job
      </Button>
      <AddJobDialog open={open} onClose={handleClose} />
      <Typography
        variant="h4"
        color="textSecondary"
        className={classes.statusTitle}
      >
        Pending Status
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job, index) => {
          if (job.status === "Pending") {
            return <JobCard job={job} key={index} />;
          }
          return null;
        })}
      </Grid>

      <Typography
        variant="h4"
        color="textSecondary"
        className={classes.statusTitle}
      >
        Interview Status
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job, index) => {
          if (job.status === "Interview") {
            return <JobCard job={job} key={index} />;
          }
          return null;
        })}
      </Grid>
      <Typography
        variant="h4"
        color="textSecondary"
        className={classes.statusTitle}
      >
        Offer Status
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job, index) => {
          if (job.status === "Offer") {
            return <JobCard job={job} key={index} />;
          }
          return null;
        })}
      </Grid>
      <Typography
        variant="h4"
        color="textSecondary"
        className={classes.statusTitle}
      >
        Other Status
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job, index) => {
          if (job.status === "Other") {
            return <JobCard job={job} key={index} />;
          }
          return null;
        })}
      </Grid>
      <Typography
        variant="h4"
        color="textSecondary"
        className={classes.statusTitle}
      >
        Denied Status
      </Typography>
      <Grid container spacing={2}>
        {jobs.map((job, index) => {
          if (job.status === "Denied") {
            return <JobCard job={job} key={index} />;
          }
          return null;
        })}
      </Grid>
    </Container>
  );
}

export default Dashboard;
