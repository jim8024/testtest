import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import "./CreatePlanner.css";
import DatePicker from "./DatePicker";
import Map from "./Map";
import TourCard from "./TourCard";

function Test() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expanded, setExpanded] = useState("panel0");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log(selectedItems);
  return (
    <div className="TestContainer">
      <Grid container className="gridContainer">
        <Grid item className="leftbar" xs={12} sm={2}>
          <DatePicker
            expanded={expanded}
            handleChange={handleChange}
            selectedItems={selectedItems}
            setSelectedIndex={setSelectedIndex}
            setSelectedItems={setSelectedItems}
          />
          {/* <AppendCard selectedItems={selectedItems} /> */}
        </Grid>
        <Grid item className="maparea" xs={12} sm={8}>
          <Map selectedItems={selectedItems} />
        </Grid>
        <Grid item className="rightbar" xs={12} sm={2}>
          <TourCard
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            selectedIndex={selectedIndex}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Test;
