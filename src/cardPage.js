 import * as React from "react";
 import Card from "@mui/material/Card";
 import CardContent from "@mui/material/CardContent";
 import CardMedia from "@mui/material/CardMedia";
 import Typography from "@mui/material/Typography";
 import { CardActionArea } from "@mui/material";

export default function CardPrayerTime({ PrayerName, PrayerTime, prayerImg }) {
  return (
    <Card
      sx={{
        width: { xs: "80%", sm: "290px" },
        boxShadow: " 0px 0px 10px black",
        marginLeft:"0px !important"
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="150" image={prayerImg} />
        <CardContent
          sx={{
            minHeight: "150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "end",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {PrayerName}
          </Typography>
          <Typography color="text.secondary" variant="h2">
            {PrayerTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}