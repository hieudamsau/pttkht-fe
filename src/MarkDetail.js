import React, { useEffect, useState } from "react";
import StudentApi from "./api/StudentApi";
import { Space, Table, Tag } from "antd";
import MarkApi from "./api/MarkApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainContainer from "./layout/MainContainer";

const ListStudent = () => {
  const [mark, setmMark] = useState();
  const user = JSON.parse( localStorage.getItem("user"))
  console.log("user", user.role);
  const columns = [
    {
      title: "Tên",

      render: (value) => <a>{value.user.full_name}</a>,
    },
    {
      title: "Mã SV ",
      dataIndex: "ma_sv",
      key: "ma_sv",
    },
    {
      title: "Toán cao cấp",
      dataIndex: "toan_cao_cap",
      key: "toan_cao_cap  ",
    },
    {
      title: "Triết học ",
      dataIndex: "triet_hoc",
      key: "triet_hoc",
    },
    {
      title: "Phân tích thiết kế hệ thống ",
      dataIndex: "pttkht",
      key: "pttkht",
    },
    {
      title: '#',
      key: 'action',
      render: (value) => (
        <Space size="middle">
          {user?.role===3 ?"":<Link to={`/action-mark/`+value.ma_sv} >Sửa </Link>}
        </Space>
      ),
    },
  ];
  const { ma_sv } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ma_sv) {
      MarkApi.getMark(user?.ma_sv).then((res) => {
        if (res.data.status === 200) {
          setmMark(res.data.data);
        }
      })
    }
    MarkApi.getMark(ma_sv).then((res) => {
      if (res.data.status === 200) {
        setmMark(res.data.data);
      }
    })
  }, []);
  console.log(mark);
  return (
    <MainContainer>
      <div style={{ marginBottom: "10px" }}>
      </div>
      <div className="container">
        <Table columns={columns} dataSource={mark} />
      
      </div>
    </MainContainer>
  );
};

export default ListStudent;
