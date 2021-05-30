import React, { useRef, useState } from "react";
import { FormControl } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../../AuthContext";
import { Link, useHistory } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import { db } from "../../firebase";

export default function UpdateUser() {
  const usernameRef = useRef();

  const photoURLRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    if (usernameRef.current.value && photoURLRef.current.value) {
      promises.push(
        db.collection("users").add({
          username: usernameRef.current.value,
          photoURLRef: photoURLRef.current.value,
          user: currentUser.uid,
          
        })
      );
    }
    // if (photoURLRef.current.value) {
    //   const res = { photoURL: photoURLRef.current.value };
    //   console.log(photoURLRef.current.value);
    //   promises.push(updatePhoto(res));
    // }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Container>
        <Typography variant="h4">Update Profile</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <FormControl id="email" fullWidth>
            <TextField
              label="Enter a Username"
              aria-describedby="username-helper-text"
              variant="outlined"
              type="text"
              inputRef={usernameRef}
              required
              // defaultValue={currentUser.email}
            />
            <FormHelperText id="email-helper-text">
              Change your email address above to update it.
            </FormHelperText>
          </FormControl>
          
          <FormControl id="photo-update" fullWidth>
            <TextField
              label="URL to Link of Photo"
              aria-describedby="photo-helper-text"
              variant="outlined"
              type="text"
              inputRef={photoURLRef}
            />
            <FormHelperText id="photo-helper-text">
              Leave blank to keep the same
            </FormHelperText>
          </FormControl>

          <Button disabled={loading} variant="contained" type="submit">
            Update
          </Button>
        </form>

        <Button variant="contained">
          <Link to="/">Cancel</Link>
        </Button>
      </Container>
    </>
  );
}
