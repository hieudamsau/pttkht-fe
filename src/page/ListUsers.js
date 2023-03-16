
import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';   
import MainContainer from '../layout/MainContainer';
import StudentApi from '../api/StudentApi';
import { Link, useNavigate } from 'react-router-dom';

const ListUsers = () => {
    const {Column} = Table
    const [users,setUser]= useState()
    const navigate = useNavigate()

    useEffect(()=>{
        StudentApi.getAll().then(res =>{
            if(res.data.status === 200){
                setUser(res.data.data)
            }
        })
    },[])
    const data = users?.data
  return (
    <div>
        <MainContainer>
            <div className='container'>
                <div style={{marginBottom:'10px'}}>
                      <span
                          style={{padding:'10px 10px',color:"#fff",background:"#37911f",borderRadius:'12px',cursor:'pointer'}}
                          onClick={()=>navigate("/user")}
                      >Thêm sinh viên</span>
                </div>
                <Table dataSource={data} rowKey={data => data?.id} style={{textAlignLast: 'center'}} pagination={false}>
                    <Column title={"Mã SV"} dataIndex="ma_sv" key="ma_sv"/>
                    <Column title={"Họ và tên"} dataIndex="full_name" key="full_name"/>
                    <Column title={"Email"} dataIndex="email" key="email"/>
                    <Column title={"Số điện thoại"} dataIndex="phone" key="phone"/>
                    <Column title={"Địa chỉ"} dataIndex="address" key="address"/>
                    <Column title={"#"} render={(value)=>(
                        <span
                            style={{cursor:'pointer'}}
                            onClick={()=>navigate(`/user/${value?.id}`)}
                        >sửa</span>
                    )}/>

                </Table>
            </div>
        </MainContainer>
    </div>
  )
}

export default ListUsers