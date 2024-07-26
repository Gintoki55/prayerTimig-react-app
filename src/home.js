import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import moment from "moment";
import "moment/min/locales";
import CardPrayerTime from "./cardPage";
import BasicSelect from "./input";
import { TimePropContext } from "./context/TimingContext";

moment.locale("ar");

function HomePage() {
  const { timings } = useContext(TimePropContext);
  const [nameCity, setNamecityFromChild] = useState("ظفار");
  const [date, setDate] = useState("");
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");

  const prayerArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "dohar", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const timeAndDate = moment().format("dddd, MMMM Do YYYY | h:mm a");
      setDate(timeAndDate);
    }, 1000);

    const interval2 = setInterval(() => {
      setUpCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, [timings]);

  const setUpCountDownTimer = () => {
    const MomentNow = moment();

    const FajrMoment = moment(timings["Fajr"], "HH:mm");
    const doharMoment = moment(timings["dohar"], "HH:mm");
    const AsrMoment = moment(timings["Asr"], "HH:mm");
    const MaghribMoment = moment(timings["Maghrib"], "HH:mm");
    const IshaMoment = moment(timings["Isha"], "HH:mm");

    let nextPrayer = 4;

    if (MomentNow.isAfter(FajrMoment) && MomentNow.isBefore(doharMoment)) {
      nextPrayer = 1;
    } else if (
      MomentNow.isAfter(doharMoment) &&
      MomentNow.isBefore(AsrMoment)
    ) {
      nextPrayer = 2;
    } else if (
      MomentNow.isAfter(AsrMoment) &&
      MomentNow.isBefore(MaghribMoment)
    ) {
      nextPrayer = 3;
    } else if (
      MomentNow.isAfter(MaghribMoment) &&
      MomentNow.isBefore(IshaMoment)
    ) {
      nextPrayer = 4;
    } else {
      nextPrayer = 0;
    }

    setNextPrayerIndex(nextPrayer);

    const nextPrayerObject = prayerArray[nextPrayer];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerMoment = moment(nextPrayerTime, "HH:mm");
    let remainingTime = nextPrayerMoment.diff(MomentNow);

    if (remainingTime < 0){
      // Calculate The Time now to Midnight
      const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(MomentNow);
      // Calculate the midNight To fajr
      const FajrTomidNightDiff = nextPrayerMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      // sum the the remaining time to midNight && remaining from midnight to fajr
      const totalDiff = midNightDiff + FajrTomidNightDiff;
      remainingTime = totalDiff;
    }

    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTime(
      `- ${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`
    );
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            <h2>متبقي حتى صلاة {prayerArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            <h4>{date}</h4>
            <h1>{nameCity}</h1>
          </Grid>
        </Grid>
        <hr style={{ opacity: "0.5" }} />
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-around"
          marginTop="30px"
          sx={{
            display: "flex",
            flexDirection: { xs: "column !important" , sm :"row !important"},
            justifyContent:"center",
            alignItems: "center",
            gap:{xs:"20px", sm:"8px"},
          }}
        >
          <CardPrayerTime
            PrayerName="العشاء"
            PrayerTime={timings.Isha}
            prayerImg="./images/masqet1.jpeg"
          />
          <CardPrayerTime
            PrayerName="المغرب"
            PrayerTime={timings.Maghrib}
            prayerImg="./images/maq1.jpeg"
          />
          <CardPrayerTime
            PrayerName="العصر"
            PrayerTime={timings.Asr}
            prayerImg="./images/asar.jpeg"
          />
          <CardPrayerTime
            PrayerName="الظهر"
            PrayerTime={timings.dohar}
            prayerImg="./images/asar1.jpeg"
          />
          <CardPrayerTime
            PrayerName="الفجر"
            PrayerTime={timings.Fajr}
            prayerImg="./images/fajar.jpeg"
          />
        </Stack>
        <div style={{ width: "100%", maxWidth: "300px", margin: "20px auto" }}>
          <BasicSelect setNamecityFromChild={setNamecityFromChild} />
        </div>
      </Container>
    </>
  );
}

export default HomePage;
