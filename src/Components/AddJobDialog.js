import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formRoot: {
    width: "75%",
  },
  root: {
    width: "75vw",
  },
}));

export const AddJobDialog = (props) => {
  const { currentUser } = useAuth();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [person, setPerson] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState("");
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState("");
  const [listing, setListing] = useState("");
  const [additional, setAdditional] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  function handleSubmit(e) {
    e.preventDefault();

    //Create folder in database
    db.jobs
      .doc(name)
      .set({
        date: date,
        type: type,
        name: name,
        person: person,
        address: address,
        phone: phone,
        email: email,
        results: results,
        user: currentUser.uid,
        method: method,
        status: status,
        listing: listing,
        createdAt: db.getCurrentTimestamp(),
        id: db.getCurrentTimestamp(),
        additional: additional
      })
      .then(() => {
        console.log("Document written with ID: ", name);
        setEmail("");
        setAdditional("");
        handleClose();
        setMethod("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <Dialog onClose={handleClose} open={open} className={classes.root}>
      <Container>
        <form className={classes.formRoot} noValidate autoComplete="off">
          <FormControl id="date" fullWidth>
            <TextField
              id="date"
              label="Date of Contact"
              type="date"
              variant="outlined"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDate(e.target.value)}
            />
            <FormHelperText id="date-helper-text">
              Enter the date you made contact
            </FormHelperText>
          </FormControl>
          <FormControl id="type" fullWidth>
            <TextField
              label="Type of Work"
              aria-describedby="type-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setType(e.target.value)}
              required
            />
            <FormHelperText id="type-helper-text">
              What is the job title that you applied for?
            </FormHelperText>
          </FormControl>
          <FormControl id="name" fullWidth>
            <TextField
              label="Company Name"
              aria-describedby="name-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormHelperText id="symbol-helper-text">
              What is the company name?
            </FormHelperText>
          </FormControl>
          <FormControl id="address" fullWidth>
            <TextField
              label="Company Address"
              aria-describedby="address-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              required
              multiline
              rows={3}
            />
            <FormHelperText id="address-helper-text">
              What is the company address?
            </FormHelperText>
          </FormControl>
          <FormControl id="person" fullWidth>
            <TextField
              label="Person Contacted"
              aria-describedby="person-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setPerson(e.target.value)}
              required
            />
            <FormHelperText id="person-helper-text">
              Who did you contact?
            </FormHelperText>
          </FormControl>
          <FormControl id="phone" fullWidth>
            <TextField
              label="Phone Number"
              aria-describedby="phone-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <FormHelperText id="phone-helper-text">
              What is the phone number of the person or company you contacted?
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth id="method">
            <InputLabel>Method Of Contact</InputLabel>
            <Select
              onChange={(e) => setMethod(e.target.value)}
              variant="outlined"
              aria-describedby="method-helper-text"
              required
              value={method}
            >
              <MenuItem value={"In Person"}>In Person</MenuItem>
              <MenuItem value={"Resume"}>Resume</MenuItem>
              <MenuItem value={"Telephone"}>Telephone</MenuItem>
              <MenuItem value={"Email"}>Email</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <FormHelperText id="method-helper-text">
              How did you contact them?
            </FormHelperText>
          </FormControl>
          <FormControl id="email" fullWidth>
            <TextField
              label="Email Address"
              aria-describedby="email-helper-text"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              What is the email address of the person you contacted?
            </FormHelperText>
          </FormControl>
          <FormControl id="results" fullWidth>
            <TextField
              label="Results of contact"
              aria-describedby="results-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setResults(e.target.value)}
              required
            />
            <FormHelperText id="results-helper-text">
              What were the results?
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth id="staus">
            <InputLabel>Status</InputLabel>
            <Select
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined"
              aria-describedby="status-helper-text"
              value={status}
              required
            >
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Denied"}>Denied</MenuItem>
              <MenuItem value={"Interview"}>Interview</MenuItem>
              <MenuItem value={"Offer"}>Offer</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <FormHelperText id="status-helper-text">
              What is the current status?
            </FormHelperText>
          </FormControl>
          <FormControl id="listing" fullWidth>
            <TextField
              label="Listing Website?"
              aria-describedby="listing-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setListing(e.target.value)}
            />
            <FormHelperText id="listing-helper-text">
              Where did you apply for the website?
            </FormHelperText>
          </FormControl>
          <FormControl id="additional" fullWidth>
            <TextField
              label="Additional Info"
              aria-describedby="additional-helper-text"
              variant="outlined"
              type="text"
              onChange={(e) => setAdditional(e.target.value)}
              multiline
              rows={3}
            />
            <FormHelperText id="additional-helper-text">
              Anything else to add?
            </FormHelperText>
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            type="submit"
          >
            Add Job
          </Button>
        </form>
      </Container>
    </Dialog>
  );
};

export default AddJobDialog;
