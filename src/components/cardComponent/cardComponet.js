import { Paper } from "@mui/material";
import { color, height, minHeight } from "@mui/system";
import React from "react";
import './style.css'
const CardComponent = (props) => {
  return (
     <div className="Panel">
        {props.panelData && 
         Object.keys(props.panelData).map((data) => (
                <Paper sx={{
                    width: 128,
                    margin: 2,
                    textAlign: "center",
                    lineHeight: 2,
                    minHeight: 40,
                
                }}
                style= {{
                    backgroundColor: '#3f51b1',
                    color: 'whitesmoke'
                }}
                 key={data} elevation='8'>
                 <p>{data}</p>
                 <p>{props.panelData[data]}</p>
                </Paper>
              ))}
     </div>
  );
}
export default CardComponent;
