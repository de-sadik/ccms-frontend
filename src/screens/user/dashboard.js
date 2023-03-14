import React, { useEffect, useState } from "react";
import AppBarComponet from "../../components/appBar/appBar";
import CardComponent from "../../components/cardComponent/cardComponet";
import TableComoponent from "../../components/table/tableComponent";
import ThumbBox from "../../components/thumbBox/thumbBox";
import { userService } from "../../services/userService";

const Dashboard = () => {
    const [keonicsData,setKeonicsData] = useState(null);
    const [smartTimerData,setSmartTimerData] = useState(null);
    const [onCount ,setOnCount] = useState(0)
    const [onffCount ,setOffCount] = useState(0)
    const [totalCount,setTotalCount] =  useState(0) 
    const title = [
        { title: "Total CCMS", description: totalCount },
        { title: "Total On", description: onCount },
        { title: "Total Off", description: onffCount}
      ];  

    // const [ panelData, setPanelData] = useState(null);

    const getData = () =>{
        // if(JSON.parse(localStorage.getItem("data"))){
        //     localStorage.removeItem("data");
        //     console.log("cleared")
        // }
        // userService.getErrorData()
        // .then((response)=>{
        //     if (response && response.status && response.status === 200){
        //        setData(response.data)
               
        //     }
        // })
        // .catch((error)=>{

        // })
        userService.getData()
      .then((response)=>{
        // console.log(response)
        if (response && response.status && response.status === 200){
          setTotalCount(response.data.data.panelData['Total CCMS'])
          setOffCount(response.data.data.panelData['Total OFF CCMS'])
          setOnCount(response.data.data.panelData['Total ON CCMS'])
          setKeonicsData(response.data.data.data)
          setSmartTimerData(response.data.data.newData)

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
        getData();
    },[])
    return (
        <>
            <div className="App">
                {/* <h3 name="title">CCMS THANE</h3> */}
            </div>
            { smartTimerData &&
            <div style={{"padding": "8px"}}>
            <ThumbBox title={title}/>
            {/* <CardComponent  panelData = { data.panelData}/> */}
            
             <TableComoponent  smartTimerData = {smartTimerData}  keonicsData= {keonicsData} /> 
             </div>}
        </>
    )

}
export default Dashboard;