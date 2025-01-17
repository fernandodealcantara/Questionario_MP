/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@material-ui/core";
import React, { useEffect } from "react";

import QuizData from "../../components/UserData/QuizData";
import ResponseData from "../../components/UserData/ResponseData";
import styles from "./styles";

const useStyles = styles;

export default function PopUpList({ mustOpen, handleOpen, userData }) {
  const classes = useStyles;
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  useEffect(() => {
    if (mustOpen === true) {
      setScroll("paper");
      setOpen(true);
    }
  }, [mustOpen]);

  const handleClose = () => {
    handleOpen();
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Dados do {userData.name}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Container className={classes.DataContainerWrapper}>
              <p>RESPOSTAS</p>
              <Container className={classes.DataContainer}>
                {userData.quizResponses?.map((response) => (
                  <QuizData key={response._id} response={response} />
                ))}
              </Container>
              <p>CREATED QUIZZES</p>
              <Container className={classes.DataContainer}>
                {userData.quizCreated?.map((quiz) => (
                  <ResponseData key={quiz._id} quiz={quiz} />
                ))}
              </Container>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="red">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
