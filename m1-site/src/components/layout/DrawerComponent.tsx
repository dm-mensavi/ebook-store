// export default DrawerComponent;

import React, { useState } from "react";
import { Drawer, List } from "@mui/material";
import RatingCard from "../ratings/RatingCard";

type DrawerComponentProps = {
  bookId: string; // Add bookId as a prop
  averageRating: number;
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  bookId,
  averageRating,
}) => {
  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  return (
    <div>
      {/* Button to toggle the Drawer */}
      <div
        className="cursor-pointer text-orange-500 mt-2"
        onClick={toggleDrawer(true)}
      >
        View Ratings
      </div>

      {/* Temporary Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        style={{ width: 300 }}
        PaperProps={{
          style: { width: 300, padding: "10px", backgroundColor: "#eee" },
        }}
      >
        {/*  style={{ width: 300 }} // Set the width of the drawer
      PaperProps={{
        style: { width: 300 }, // Set the width of the drawer's paper (content area)
      }} */}
        <List>
          {/* Pass the bookId to the RatingCard */}
          <RatingCard bookId={bookId} averageRating={averageRating} />
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
