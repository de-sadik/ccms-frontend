import React from "react";

const ErrorLabel = (props) =>{
    return(
        <div style={{margin: 1}}>
           <label className='error-label'>{props.error}</label>
        </div>
    )
}
export default ErrorLabel;