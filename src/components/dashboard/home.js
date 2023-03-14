import { useEffect, useState } from "react";
import { localStrorageService } from "../../services/localStorageService";
import { userService } from "../../services/userService";
import Linechart from "../charts/linechart";
import PieChart from "../charts/piecharts";
import ThumbBox from "../thumbBox/thumbBox";

export default function Home() {
  const [onCount ,setOnCount] = useState(0)
  const [onffCount ,setOffCount] = useState(0)
  const [totalCount,setTotalCount] =  useState(0)  
  const data = {
    labels: ["OFF", "ON"],
    datasets: [
      {
        data: [onffCount, onCount],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
      }
    ]
  };
  const title = [
    { title: "Total CCMS", description: totalCount },
    { title: "Total On", description: onCount },
    { title: "Total Off", description: onffCount}
  ];  

  const getData = ()=>{
    userService.getData()
      .then((response)=>{
        // console.log(response)
        if (response && response.status && response.status === 200){
          setTotalCount(response.data.data.data.length)
          setOffCount(response.data.data.panelData['Total OFF CCMS'])
          setOnCount(response.data.data.panelData['Total ON CCMS'])
          // setOffCount(response.data.data.data.filter((row)=>{

          //   return row['Status'] ==`OFF`;
          // }).length )
          // setOnCount(response.data.data.data.filter((row)=>{
          //   return row['Status'] ==`ON`;
          // }).length )
        // localStrorageService.storeReciviedData(response.data.data)     
        
          
          // setNewSiteData(response.data.data.newData)
      }
      }).catch((error)=>{

      })
  }
  useEffect(()=>{
   getData()
  },[])
  return (
    <div class="container-fluid" style={{ paddingTop: "9px" }}>
      <div class="row">
        <div class="col-12">
          <ThumbBox title={title}/>
          <div class="row">
            <PieChart data={data}/>
            <Linechart/>
          </div>
        </div>
      </div>
    </div>
  );
}
