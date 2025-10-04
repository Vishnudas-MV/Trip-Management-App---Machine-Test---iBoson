import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemCard from "./CustomComponents/ItemCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const [dashTrips, setDashTrips] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openCreateTripModel, setOpenCreateTripModel] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [addData, setAddData] = useState({});

  useEffect(() => {
    setAddData({
      tripName: selectedItem?.tripName,
      date: selectedItem?.date,
      activityCount: selectedItem?.activityCount,
      img: selectedItem?.img,
    });
  }, [selectedItem]);

  const changefn = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const AddTrip = () => {
    if (isEdit) {
      const dashTripCopy = dashTrips;
      const dashTripFiltered = dashTripCopy?.filter((a) => {
        return a?.tripName !== selectedItem?.tripName;
      });

      const dashTripCopyNew = [...dashTripFiltered, addData];
      localStorage?.setItem("TripData", JSON.stringify(dashTripCopyNew));
      setDashTrips([...dashTrips, dashTripCopyNew]);
      closeAdd()
    } else {
      const dashTripCopy = [...dashTrips, addData];
      localStorage?.setItem("TripData", JSON.stringify(dashTripCopy));
      setDashTrips([...dashTrips, addData]);
      closeAdd()
    }
  };

  const deleteTrip = (item)=>{

      const dashTripFiltered = dashTrips?.filter((a)=>{return a?.tripName !== item?.tripName})
      localStorage?.setItem("TripData", JSON.stringify(dashTripFiltered));
      setDashTrips(dashTripFiltered);
      closeAdd()
      alert("Deleted")
  }

  const closeAdd = () => {
    setOpenCreateTripModel(false);
    setAddData({
      tripName: "",
      date: "",
      activityCount: "",
      img: "",
    });
  };
  useEffect(() => {
    let data = localStorage?.getItem("TripData");
    if (data) {
      setDashTrips(JSON.parse(data));
    }
  }, []);

  const handleClose = () => {
    setOpenView(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} my={3}>
        <Typography sx={{ fontSize: "22px", color: "black" }}>
          My Trips
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setOpenCreateTripModel(true);
          }}
        >
          + Create new Trip
        </Button>
      </Box>
      <Grid container spacing={2}>
        {dashTrips?.length
          ? dashTrips?.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <ItemCard
                    item={item}
                    openView={openView}
                    setOpenView={setOpenView}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    openCreateTripModel={openCreateTripModel}
                    setOpenCreateTripModel={setOpenCreateTripModel}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    deleteTrip={deleteTrip}
                  />
                </Grid>
              );
            })
          : <Typography> No Data Found</Typography>}
      </Grid>

      <Modal
        open={openView}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedItem?.tripName}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedItem?.activityCount && selectedItem?.activityCount > 0
              ? `${selectedItem?.activityCount} Activities Planned`
              : ""}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openCreateTripModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, p: 0 }}>
          <Box sx={{ background: "skyblue", p: 2 }}>
            <Typography sx={{ fontSize: "20px", color: "white" }}>
              Add New Activity
            </Typography>
          </Box>
          <Box p={3}>
            <label> Title</label>
            <TextField
              type="text"
              placeholder="e.g., Visit Eiffel Tower"
              fullWidth
              name="tripName"
              onChange={changefn}
              sx={{ margin: "10px auto" }}
              value={addData?.tripName ? addData?.tripName : ""}
            />

            <label> Time</label>
            <TextField
              type="date"
              name="date"
              placeholder="e.g., Visit Eiffel Tower"
              fullWidth
              onChange={changefn}
              value={addData?.date ? addData?.date : ""}
              sx={{ margin: "10px auto" }}
            />

            <label> Image Path</label>
            <TextField
              type="text"
              name="img"
              placeholder="Enter the path of the Image"
              fullWidth
              onChange={changefn}
              value={addData?.img ? addData?.img : ""}
              sx={{ margin: "10px auto" }}
            />

            <label> Notes(Optional)</label>
            <TextField
              type="text"
              placeholder="Any Additional Information or Reminders..."
              fullWidth
              multiline
              rows={4}
              name="activityCount"
              value={addData?.activityCount ? addData?.activityCount : ""}
              onChange={changefn}
              sx={{ margin: "10px auto" }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
            <Button
              sx={{ background: "lightgrey", color: "black", mx: 2 }}
              onClick={closeAdd}
            >
              {" "}
              Cancel
            </Button>
            <Button variant="contained" onClick={AddTrip}>
              {" "}
              Save Activity
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Dashboard;
