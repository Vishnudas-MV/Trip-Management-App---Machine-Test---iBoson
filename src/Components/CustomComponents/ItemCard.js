import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function ItemCard({
  item,
  openView,
  setOpenView,
  selectedItem,
  setSelectedItem,
  openCreateTripModel,
  setOpenCreateTripModel,
  isEdit,
  setIsEdit,
  deleteTrip,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
   <Card sx={{ width: '100%', borderRadius: 4 }}>
      <CardMedia
        component="img"
        height="194"
        image={item?.img}
        alt={item?.tripName}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "black",
            textAlign: "left",
            fontWeight: "600",
            fontSize: "22px",
          }}
        >
          {item?.tripName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "black",
            textAlign: "left",
            fontWeight: "500",
            fontSize: "18px",
          }}
        >
          {item?.activityCount}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          sx={{ background: "grey", color: "white" }}
          onClick={() => {
            setOpenView(true);
            setSelectedItem(item);
          }}
        >
          View{" "}
        </Button>
        <Button
          sx={{ background: "orange", color: "white" }}
          onClick={() => {
            setOpenCreateTripModel(true);
            setSelectedItem(item);
            setIsEdit(true);
          }}
        >
          Edit{" "}
        </Button>
        <Button
          sx={{ background: "red", color: "white" }}
          onClick={() => {
            deleteTrip(item);
            setSelectedItem(item);
          }}
        >
          Delete{" "}
        </Button>
      </CardActions>
    </Card>
  );
}
