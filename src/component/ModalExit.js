import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 51;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxWidth: 400,
    minWidth: 200,
    background:
      "linear-gradient( to bottom, rgba(255,255,255,0.33),rgba(255,255,255,0.1))",
    borderRadius: "10px",
    border: "1.2px solid rgba( 255, 255, 255, 0.15 )",
    backdropFilter: "blur(1rem )",
    boxShadow: "0 1px 32px 0 rgba(49, 51, 77, 0.3)",
    padding: theme.spacing(2, 4, 3),
  },
  buttons: {
    backgroundColor: "transparent",
    border: "none",
    margin: "10px",
    cursor: "pointer",
  },
  text: {
    fontWeight: "400",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const history = useHistory();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    localStorage.removeItem('Login')
    history.push("/");
    history.go();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title" className={classes.text}>
        Rostdan ham chiqmoqchimisiz ?{" "}
      </h3>
      <span className="modal-exit-btn-wrapper">
        <button className={classes.buttons} onClick={handleExit}>
          Ha
        </button>
        <button className={classes.buttons} onClick={handleClose}>
          Yoq
        </button>
      </span>
    </div>
  );

  return (
    <div>
      <button type="button" className="modal-exit" onClick={handleOpen}>
        Chiqish
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
