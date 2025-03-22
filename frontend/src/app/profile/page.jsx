'use client'
import React, { useEffect, useState } from 'react'
// import Nav from './components/Nav'

import Modal from 'antd/es/modal/Modal'
import { DatePicker, Form, Input, Select, Table } from 'antd'
import Nav from '../components/Nav'
import { useRouter } from 'next/navigation'
import { AreaChartOutlined, BarChartOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Analyst from '../components/Analyst'
const page = () => {
  const [userData, setUserData] = useState([]);
  const [Task, setTask] = useState([]);
  const [Vision, setVision] = useState('table');
  const [form] = Form.useForm(); 
    const Router=useRouter();
  const [showModel, setshowModel] = useState(false)
  const logoutHandler=async()=>{
    console.log("hello")
    localStorage.removeItem('authToken'); // or sessionStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/';
  };
  const handleSubmit=async(data)=>{
console.log(data)

   
var token =localStorage.getItem("authToken");
try {
  const authToken = token;
  if (!authToken) {
    // Redirect to login page if authentication token is missing
    Router.push('/');
    return;
  }
  const response = await fetch('http://localhost:5000/api/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // withCredentials: true,
      authorization: `${authToken}`,
    },
    withCredentials: true,
    body: JSON.stringify(data),

  });
  if (response) {
    // Router.push('/profile');
    setshowModel(false)
    form.resetFields();
    console.log("done")
  } else {
    console.error('Failed to fetch user data');
  }
} catch (error) {
  console.error('Error fetching user data:', error);
}

  }
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '1',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '2',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: '3',
    },
    {
      title: 'Desciption',
      dataIndex: 'description',
      key: '4',
    },
  ];
  useEffect(() => {
    // console.log(token)
    const fetchData = async () => {
      var token =localStorage.getItem("authToken");
      try {
        const authToken = token;
        if (!authToken) {
          // Redirect to login page if authentication token is missing
          Router.push('/');
          return;
        }
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // withCredentials: true,
            authorization: `${authToken}`,
          },
          withCredentials: true

        });
        if (response.ok) {
          const data = await response.json();
      
          setUserData([...userData,data]);
          setTask(data.expense)
       
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [Task]);
  return (
    <div className='w-screen h-screen'>
      <Nav/>
      <div className='w-full h-auto flex justify-between items-center p-5'>
    <h2 className='text-3xl font-light'>Your money expenses</h2>
    <div className="options flex gap-5">
    <UnorderedListOutlined className={`icons listicon  ${Vision=='table'?"active-icon":"inctive-icon"}`} onClick={()=>setVision('table')} />
    <AreaChartOutlined className={`icons baricon ${Vision=='analysis'?"active-icon":"inctive-icon"}`} onClick={()=>setVision('analysis')}/>
    </div>
    <button onClick={()=>setshowModel(true)} className='bg-blue-500 text-white p-2 rounded-xl'>Add data</button>
      </div>
      <hr />
      {Vision=='table'? <Table columns={columns} dataSource={Task}/>
    :
    <Analyst allmoney={Task}/>  
    }
     



      <Modal  title="Add transection"
      open={showModel}
      
      onCancel={()=>setshowModel(false)}
      footer={false}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item label='Amount' name={"amount"}>
          <Input type="text"/>
        </Form.Item>
        <Form.Item label='Type' name={"type"}>
          <Select placeholder="select type">
    <Select.Option value='income'>Income</Select.Option>
    <Select.Option value='expense'>Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Category' name={"category"}>
        <Select placeholder="select type">
    <Select.Option value='salary'>Salary</Select.Option>
    <Select.Option value='project'>Project</Select.Option>
    <Select.Option value='bills'>Bills</Select.Option>
    <Select.Option value='food'>Food</Select.Option>
    <Select.Option value='medical'>Medical</Select.Option>
    <Select.Option value='movies'>Movies</Select.Option>
    <Select.Option value='fees'>Fees</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Description'  name={"description"}>
          <Input type="text" value="hello" />
        </Form.Item>
        <Form.Item label='Date' name={"date"}>
          {/* <DatePicker /> */}
          <Input type='date'/>
        </Form.Item>
        <button className='bg-green-400 text-white p-2' type='submit'>Save</button>
        </Form>
      </Modal>
    </div>
  )
}

export default page