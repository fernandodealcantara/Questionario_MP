import {
  Checkbox,
  Paper,
  TextField,
  Typography,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  text: {
    marginLeft: "0.5rem",
  },
}));

export default ({ questionText, erase, eraseQuestionForm }) => {
  const [wording, setWording] = useState("");
  const [response, setResponse] = useState("");
  const [hasResponse, setHasResponse] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    questionText(wording, null, hasResponse, response, 3);
  }, [wording, response, hasResponse]);

  useEffect(() => {
    if (erase) {
      setWording("");
      setHasResponse(false);
      setResponse("");
      eraseQuestionForm(false);
    }
  }, [erase]);

  const switchMode = () => {
    setHasResponse(!hasResponse);
    setResponse("");
  };

  const handleWording = (e) => {
    setWording(e.target.value);
  };

  const handleResponse = (e) => {
    setResponse(e.target.value);
  };

  return (
    <Paper
      className={`${classes.paper} ${classes.root} ${classes.form}`}
      elevation={3}
    >
      <Typography variant="h6" className={classes.text}>
        Nesse tipo de questão as respostas são em formato de texto.
      </Typography>
      <TextField
        value={wording}
        name="wording"
        onChange={handleWording}
        variant="outlined"
        fullWidth
        label="Enunciado"
        autoFocus
      />
      {hasResponse ? (
        <TextField
          value={response}
          name="response"
          onChange={handleResponse}
          variant="filled"
          fullWidth
          label="Resposta"
          autoFocus
        />
      ) : (
        ""
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={hasResponse}
            onChange={switchMode}
            name="hasResponse"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label={
          hasResponse
            ? "Escreva sua resposta."
            : "Clique aqui para adicionar resposta."
        }
        labelPlacement="end"
      />
    </Paper>
  );
};
