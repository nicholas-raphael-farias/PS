import React from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const Timeline = ({step_bar_helper}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-8">
      <ProgressBar
        percent={(100/step_bar_helper.length)*step_bar_helper.filter(m => m.was_completed).length}
        filledBackground="black">
        
        <Step transition="scale">
          {({ accomplished, index }) => (
            <div className={"indexedStep"}>
            </div> 
          )}
        </Step>


        {step_bar_helper.map(modifier => 
          <Step>
            {({ index }) => (
            <div className={`indexedStep ${modifier.was_completed ? "accomplished" : null}`}>
               {index}
            </div>
            )}
          </Step>
        )} 
        
        </ProgressBar>
      </div>  
    </div>
  )
}

export default Timeline
