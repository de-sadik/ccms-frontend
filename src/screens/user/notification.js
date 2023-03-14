import { Grid } from "@material-ui/core";
import { Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationComponet = (props) => {
  const location = useLocation();
  const data = location.state.record;
  // let arr = []
  // if(data){
  //     data['Data'].map(dat=> console.log(dat));
  //     arr = data['Data'];
  // }
  
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "larger",
              textAlign: "center",
            }}
          >
            Notification
          </div>
        </Grid>
      </Grid>

      <Grid container>
        {data &&
          data.map((rec, index) => (
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  fontWeight: "normal",
                  paddingLeft: "30px",
                  margin: 10,
                }}
              >
                <Card sx={{ minWidth: 400 }}>
                  <Typography sx={{ fontSize: 14 }}>
                    {index}-{rec["Consumer No"]}
                  </Typography>
                  <Typography variant="body2">
                    Active Load(Kw) - {rec["Active Load(Kw)"]}
                    <br />
                    Location - {rec["Location"]}
                    <br />
                    Update Time - {rec["Update Time"]}
                  </Typography>
                </Card>
              </div>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
export default NotificationComponet;
