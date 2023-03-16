import React, { useEffect, useState } from 'react'
import StudentApi from './api/StudentApi'
import { Space, Table, Tag } from 'antd';   
import MarkApi from './api/MarkApi';
import { Link, useParams } from 'react-router-dom';

const ListStudent = () => {
  const [mark,setmMark] = useState()
  const user = localStorage.getItem('user')
  console.log('user',user);
const columns = [
  {
    title: 'Tên',

    render: (value) => <a>{value.user.full_name}</a>,
  },
  {
    title: 'Mã SV ',
    dataIndex: 'ma_sv',
    key: 'ma_sv',
  },
  {
    title: 'Toán cao cấp',
    dataIndex: 'toan_cao_cap',
    key: 'toan_cao_cap  ',
  },
  {
      title: 'Triết học ',
      dataIndex: 'triet_hoc',
      key: 'triet_hoc',
    },
    {
      title: 'Phân tích thiết kế hệ thống ',
      dataIndex: 'pttkht',
      key: 'pttkht',
    },
];
  const {ma_sv} = useParams()
  useEffect(()=>{
    const getMarkById = async ()=>{
        try {
            const {data:data} = await MarkApi.getMark(ma_sv)
            setmMark(data.data)
        }
        catch(error){
            console.log(error);
        }
    }
    getMarkById()
},[])
console.log(mark);
  return (
    <div className='container'><Table columns={columns} dataSource={mark} /></div>
  )
}

export default ListStudent