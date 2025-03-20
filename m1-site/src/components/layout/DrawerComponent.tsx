// import React, { useState } from "react";
// import { Drawer, List } from "@mui/material";
// import RatingCard from "../ratings/RatingCard";

// type DrawerComponentProps = {
//   bookId: string; // Add bookId as a prop
// };

// const DrawerComponent = ({bookId}) => {
//   const labels: { [index: string]: string } = {
//     0.5: "Useless",
//     1: "Useless+",
//     1.5: "Poor",
//     2: "Poor+",
//     2.5: "Ok",
//     3: "Ok+",
//     3.5: "Good",
//     4: "Good+",
//     4.5: "Excellent",
//     5: "Excellent+",
//   };
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [value, setValue] = React.useState<number | null>(2);
//   const [hover, setHover] = React.useState(-1);

//   const toggleDrawer = (open: boolean) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setIsDrawerOpen(open);
//   };

//   return (
//     <div>
//       {/* Button to toggle the Drawer */}
//       <div className="cursor-pointer" onClick={toggleDrawer(true)}>
//         View Ratings
//       </div>

//       {/* Temporary Drawer */}
//       <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
//         <List>
//           <RatingCard bookId={bookId} />
//         </List>
//       </Drawer>
//     </div>
//   );
// };

// export default DrawerComponent;

import React, { useState } from "react";
import { Drawer, List } from "@mui/material";
import RatingCard from "../ratings/RatingCard";

type DrawerComponentProps = {
  bookId: string; // Add bookId as a prop
};

const DrawerComponent: React.FC<DrawerComponentProps> = ({ bookId }) => {
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
      <div className="cursor-pointer" onClick={toggleDrawer(true)}>
        View Ratings
      </div>

      {/* Temporary Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {/* Pass the bookId to the RatingCard */}
          <RatingCard bookId={bookId} />
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
