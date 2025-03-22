'use client'
import React, { useEffect } from 'react'

import { Column, Pie } from '@ant-design/plots';
import { Progress } from 'antd';
const Analyst = ({allmoney}) => {
    // console.log(allmoney)
    const totalAmountTransection=allmoney.length;
    const totalIncomeTransection=allmoney.filter((data)=>data.type=='income');
    const totalExpenseTransection=allmoney.filter((data)=>data.type=='expense');
    const totalIncome=totalIncomeTransection.map(data=>data.amount).reduce((acc,curr)=>acc+curr,0)
    const totalExpense=totalExpenseTransection.map(data=>data.amount).reduce((acc,curr)=>acc+curr,0)
    const totalAmount=allmoney.map(data=>data.amount).reduce((acc,curr)=>acc+curr,0)
    const incomePercent=(totalIncome/totalAmount)*100;
    const expensePercent=(totalExpense/totalAmount)*100;
    const categories=['salary','bills','fees']

    
    // console.log(totalAmount)
    const config = {
        data: [
          { type: 'Income', value: totalIncomeTransection.length },
          { type: 'Expense', value: totalExpenseTransection.length },
         
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.5,
        label: {
          text: 'value',
          style: {
            fontWeight: 'bold',
          },
        },
        legend: {
          color: {
            title: false,
            position: 'right',
            rowPadding: 1,
          },
        },
        annotations: [
          {
            type: 'text',
            style: {
              text: 'Total\nTransection',
              x: '50%',
              y: '10%',
              textAlign: 'center',
              fontSize: 15,
              fontStyle: 'bold',
            },
          },
        ],
      };
    


  return (
    <div className='p-2 flex gap-3' >
       <div className='total totalTransection w-1/5 h-3/10'>
        <div className='bg-gray-200 p-2'>
            <h2>Total Transection :{totalAmountTransection}</h2>
            <h2>Total Income Transection :{totalIncomeTransection.length}</h2>
            <h2>Total Expense Transection :{totalExpenseTransection.length}</h2>
        </div>
        <div className='piechart w-full' style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
    <Pie  style={{ width: 300, height: 'auto' }} {...config} />
        </div>
       </div>
       <div className="total totalamount w-1/5 h-3/10">
        <div className="amountvalues bg-gray-200 p-2">
            <h2>Total Amount : {totalAmount}</h2>
        </div>
        <div className="values my-2">
            <h2 className='text-green-500 font-bold'>Income :{totalIncome}</h2>
            <h2 className='text-red-500 font-bold'>Expense :{totalExpense}</h2>
        </div>
        <div className="charts flex gap-2 p-2">
           
                <Progress type='circle'  strokeColor={"green"} percent={incomePercent.toFixed()}/>
                <Progress type='circle' strokeColor={"red"} percent={expensePercent.toFixed()}/>
           
        </div>
       </div>
       <div className="total totalCategory w-3/6 h-3/10">
        <div className="head bg-gray-200 p-2">
            Categories for Income 
        </div>
        <div className="chart">
            {categories.map((category,index)=>{
                const amount=allmoney.filter((data)=>data.type=="income" && data.category==category).reduce((acc,curr)=>acc+curr.amount,0);
                return (
                    <div key={index} className="w-full p-1">
                        <div className="cardblock">
                           <h3>{category}</h3>
                            <Progress type='line' percent={((amount/totalIncome)*100).toFixed()} />
                        </div>
                    </div>
                )
            })}
        </div>
       </div>
    </div>
  )
}

export default Analyst