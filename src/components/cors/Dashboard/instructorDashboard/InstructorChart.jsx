import React from 'react'
import { Chart , registerables } from 'chart.js'
import {Pie} from 'react-chartjs-2'
import { useState } from 'react';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currCharts ,setCurrCharts] = useState("students");

    //function to genrate the random colors
    const getrandomColors = (numColors) =>{
        const colors = [];
        for(let i =0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random()*256)} , ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;
            colors.push(color);
            console.log(color);
        }
        return colors;
    }

    //create data for charts displaying student info

    const chartDataforStudents = {
        labels: courses.map((course)=>course.courseName),
        datasets: [
            {
                data: courses.map((course)=>course.totalStudentEnrolled),
                backgroundColor: getrandomColors(courses.length),
            }
        ]
    }

    //creatting data for charts displaying income info
    const chartDataForIncome = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=>course.totalAmountGenrated),
                backgroundColor: getrandomColors(courses.length),
            }
        ]
    }

    //create options
    const options = {

    }

  return (
    <div className='text-white mt-[400px]'>
      <p>Visualise</p>
      <div>
        <button onClick={()=> setCurrCharts("students")}>
            Students
        </button>
        <button onClick={()=> setCurrCharts("income")}>
            Income
        </button>
      </div>

      <div className='w-[300px]'>
        <Pie
        data={currCharts=== "students"? chartDataforStudents : chartDataForIncome}
        options={options}
        >

        </Pie>
      </div>
    </div>
  )
}

export default InstructorChart
