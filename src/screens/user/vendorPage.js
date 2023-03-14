import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { flexbox } from "@mui/system";
import React from "react";


const vendor = ({history}) => {
  return (
    <>
      <div  style={{ 
          "display": "flex",
          "width":"100%",
          "height": "90vh",
          "alignItems":"center",
          "justifyContent":"center",
      }}>
      <div style={{ "width": "30vh" , "height":"60px",backgroundColor: '#3f51b1',
                    color: 'whitesmoke', margin:"5px"}} 
                onClick={()=>{ history.push("/dashboard")  }}>
         <Typography variant="h6" color="inherit" align="center">
           KEONICS    
         </Typography>    
        </div>
        <div style={{ "width": "30vh" , "height":"60px",backgroundColor: '#3f51b1',
                    color: 'whitesmoke', margin:"5px"}} >
         <Typography variant="h6" color="inherit" align="center">
           Vendor 2    
         </Typography>    
        </div>
        <div style={{ "width": "30vh" , "height":"60px",backgroundColor: '#3f51b1',
                    color: 'whitesmoke', margin:"5px"}} >
         <Typography variant="h6" color="inherit" align="center">
           Vendor 3   
         </Typography>    
        </div>

      </div>
    </>
  );
};

export default vendor;