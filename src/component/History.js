import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { StoreContext } from "../Store/StoreG";
import Loading from "./Loading";
import Alert from "@material-ui/lab/Alert";
import { date, time } from "../tools/functions";

export default function ControlledAccordions() {
  const history = useHistory();
  useEffect(() => {
    document.title = "Parfume Center | Buyurtmalar tarixi";
    const checking = localStorage.getItem("Login");
    if (!checking || checking !== "true") {
      history.push("/");
      history.go();
    }
  }, [history]);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const state = useContext(StoreContext);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  useEffect(() => {
    axios
      .get("/user/history", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      });
  });
  return (
    <div className="border-box history">
      {loading ? (
        <Loading />
      ) : (
        rows.length !== 0 &&
        rows.map((item, index) => (
          <Accordion
            expanded={expanded === `panel${item._id}`}
            onChange={handleChange(`panel${item._id}`)}
            className="accordion-part"
            style={{
              backgroundColor: "transparent",
              padding: "8px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography style={{ fontFamily: "Poppins" }}>
                <p>{date(item.createdAt) + "  " + time(item.createdAt)}</p>
                
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer
                style={{ backgroundColor: "transparent" }}
                component={Paper}
              >
                {item.cart.length !== 0 ? (
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="table-cell">Nomi</TableCell>
                        <TableCell className="table-cell">Kategoriya</TableCell>
                        <TableCell className="table-cell">Soni</TableCell>
                        <TableCell className="table-cell">Narxi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.cart.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell className="table-cell">
                            {row.title}
                          </TableCell>
                          <TableCell className="table-cell">
                            {categories &&
                              categories.filter(
                                (item2) => item2._id === row.category
                              )[0].name}
                          </TableCell>
                          <TableCell className="table-cell">
                            {row.quantity}
                          </TableCell>
                          <TableCell className="table-cell">
                            {row.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Alert variant="filled" severity="error">
                    Bu buyurtma bekor qilingan !
                  </Alert>
                )}
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
}
