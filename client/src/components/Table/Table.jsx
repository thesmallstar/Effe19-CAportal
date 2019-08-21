import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Primary from "components/Typography/Primary.jsx";
// import Info from "components/Typography/Info.jsx";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import {Link} from 'react-router-dom';
import Button from "components/CustomButtons/Button.jsx";
function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor ,currentUser} = props;
  
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <h5>{prop}</h5>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((prop, key) => {
                  if (key === 4) {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                      <Link  style={{textDecoration:'none',color:'white'}} to={prop}>
                        <Button
                        color="warning"
                        >
                        Submit
                        </Button>
                        </Link>
                      </TableCell>
                    );
                  }
                  else if(prop===currentUser)
                  {
                    return (
                    <TableCell className={classes.tableCell} key={key}>
                      <Primary><h4>{prop}</h4></Primary>
                    </TableCell>
                  );

                  }
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      <h5>{prop}</h5>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
