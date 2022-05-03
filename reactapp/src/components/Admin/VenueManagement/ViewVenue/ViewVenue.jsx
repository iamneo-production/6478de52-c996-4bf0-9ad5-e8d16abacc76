import React, { Component } from 'react'
import { List, Card, Input, Button, Rate, Typography, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import x from "../../../../assets/bg.png"
import Header from '../../../Header/Header'
import 'antd/dist/antd.variable.min.css';
import "./ViewVenue.css"
import EditVenue from '../EditVenue/EditVenue';
import { Avatar, Breadcrumbs, Link } from '@mui/material';
const { Meta } = Card;
const { Text } = Typography;
class ViewVenue extends Component {
  venuedata = [{
    "venueId": 1,
    "venueName": "Schiller, Trantow and Kshlerinstadium",
    "venueLocation": "No Kunda",
    "venueImageUrl": "http://picsum.photos/127/100",
    "venueCapacity": 94726,
    "venueDescription": "Phasellus in felis. Donec semper sapien a libero. Nam dui."
  }, {
    "venueId": 2,
    "venueName": "Williamson Incstadium",
    "venueLocation": "Belo Oriente",
    "venueImageUrl": "http://picsum.photos/159/100",
    "venueCapacity": 79889,
    "venueDescription": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
  }, {
    "venueId": 3,
    "venueName": "Abshire LLCstadium",
    "venueLocation": "Klevan’",
    "venueImageUrl": "http://picsum.photos/239/100",
    "venueCapacity": 89685,
    "venueDescription": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros."
  }, {
    "venueId": 4,
    "venueName": "Quitzon-Jaststadium",
    "venueLocation": "Ganjur",
    "venueImageUrl": "http://picsum.photos/111/100",
    "venueCapacity": 71626,
    "venueDescription": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
  }, {
    "venueId": 5,
    "venueName": "Cruickshank-Kiehnstadium",
    "venueLocation": "Hadžići",
    "venueImageUrl": "http://picsum.photos/201/100",
    "venueCapacity": 53860,
    "venueDescription": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
  }, {
    "venueId": 6,
    "venueName": "Bayer-Hoppestadium",
    "venueLocation": "Filipowice",
    "venueImageUrl": "http://picsum.photos/246/100",
    "venueCapacity": 70784,
    "venueDescription": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
  }, {
    "venueId": 7,
    "venueName": "Quitzon Groupstadium",
    "venueLocation": "Pingle",
    "venueImageUrl": "http://picsum.photos/166/100",
    "venueCapacity": 70358,
    "venueDescription": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."
  }, {
    "venueId": 8,
    "venueName": "Mitchell, Frami and Hartmannstadium",
    "venueLocation": "Khān Neshīn",
    "venueImageUrl": "http://picsum.photos/180/100",
    "venueCapacity": 61977,
    "venueDescription": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
  }, {
    "venueId": 9,
    "venueName": "Dooley-Millsstadium",
    "venueLocation": "Cungapmimbo",
    "venueImageUrl": "http://picsum.photos/153/100",
    "venueCapacity": 61334,
    "venueDescription": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi."
  }, {
    "venueId": 10,
    "venueName": "Hauck, Abshire and Kiehnstadium",
    "venueLocation": "Barraute",
    "venueImageUrl": "http://picsum.photos/121/100",
    "venueCapacity": 56918,
    "venueDescription": "In congue. Etiam justo. Etiam pretium iaculis justo."
  }];
  backuparr = [];
  state = {
    search: '',
    venuedataarr: [],
    isModalVisible: false,
    getId: ''
  }
  breadcrumbs = [
    <Typography key="1" color="inherit">
      Admin
    </Typography>,
    <Typography key="2" color="text.primary">
      Venues
    </Typography>
  ];

  componentDidMount() {
    var u = (localStorage.getItem("venue") !== null) ? JSON.parse(localStorage.getItem("venue")) : [];
    console.log(localStorage.getItem("venue") === null, u);
    if (localStorage.getItem("venue") === null && u.length === 0) {
      this.setState({ venuedataarr: this.venuedata });
      localStorage.setItem("venue", JSON.stringify(this.venuedata));
    }
    if (u.length === 0) {
      this.setState({ venuedataarr: [] });
      localStorage.setItem("venue", JSON.stringify([]));
    }
    else {
      this.setState({ venuedataarr: u });
    }
  }
  openModal = (key) => {
    console.log(key);
    this.setState({ isModalVisible: true, getId: key });
  }
  handleCancel = () => {
    this.setState({ isModalVisible: false });
    window.location.reload();
  }
  handleOk = () => {
    this.setState({ isModalVisible: false });
    window.location.reload();
  }
  deleteVenue = (key) => {
    var m = JSON.parse(localStorage.getItem("venue"));
    var k = m.filter((el) => {
      return !(el.venueId === key);
    })
    console.log(k);
    localStorage.setItem("venue", JSON.stringify(k));
    window.location.reload();
  }

  searchbyname = () => {
    this.resetdata();
    this.backuparr = this.state.venuedataarr;
    var k = this.venuedata;
    var q = k.filter((el) => {
      console.log(el.venueName.toLowerCase().includes(this.state.search.toLowerCase()))
      return el.venueName.toLowerCase().includes(this.state.search.toLowerCase())
    })
    this.setState({ venuedataarr: q });
  }
  searchbylocation = () => {
    this.resetdata();
    this.backuparr = this.state.venuedataarr;
    var k = this.venuedata;
    var q = k.filter(el => {
      console.log(el.venueName.toLowerCase().includes(this.state.search.toLowerCase()))
      return el.venueLocation.toLowerCase().includes(this.state.search.toLowerCase())
    })
    this.setState({ venuedataarr: q });
  }
  resetdata = () => {
    this.setState({ venuedataarr: this.backuparr });
  }
  componentWillUnmount() {
    localStorage.setItem("venue", JSON.stringify(this.venuedata));
    console.log("hello");
  }
  render() {
    return (
      <div>
        <Header highlight={"Users"} />
        <div className='container-fluid bg-container '>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Avatar style={{ width: 30, height: 30, marginRight: '8px' }}>
              <span className="material-icons">person</span>
            </Avatar>{this.breadcrumbs}
          </Breadcrumbs>
          <div className='container d-flex justify-content-center' style={{ padding: "20px" }}>
            <Input
              style={{ padding: "8px", width: "50%" }}
              placeholder='Type Here to Search'
              value={this.state.search}
              onChange={(e) => { this.setState({ search: e.target.value }); console.log(e.target.value) }}>
            </Input>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<Button type="primary" size={'large'} onClick={this.searchbyname} >Search By Venue Name</Button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<Button type="primary" size={'large'} onClick={this.searchbylocation} >Search By Venue Location</Button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<Button type="primary" size={'large'} onClick={this.resetdata} disabled={this.backuparr.length === 0}>Reset</Button>
          </div>
          <List
            grid={{
              gutter: 10,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 2,
            }}
            dataSource={this.state.venuedataarr}
            renderItem={(item,index) => (
              <List.Item style={{ padding: "20px" }} key={item.venueId} id={"adminVenueGrid"+(index+1)}>
                <Card style={{ width: 350, borderRadius: "10px", border: "none"/* background: "rgba(0,0,0,0.4)"*/ }} hoverable cover={<img style={{ width: 350, height: 200, objectFit: "contain" }} alt="example" src={item.venueImageUrl} />}
                  actions={[
                    <EditOutlined key="edit" id="editVenue" onClick={() => this.openModal(item.venueId)} />,
                    <DeleteOutlined key="delete" id="deleteVenue" onClick={() => this.deleteVenue(item.venueId)} />]}>
                  <Meta title={<Text /*className='text-light'*/>{item.venueName}</Text>} description={<div className='d-flex justify-content-between'><Text /*className='text-light'*/>Place:&nbsp;{item.venueLocation}</Text><Rate disabled defaultValue={2} /></div>} />
                </Card>
              </List.Item>
            )} />
          <a href="/admin/addVenue"><Button type="primary" icon={<PlusOutlined />} size={"large"} id="addVenue" style={{ position: "fixed", right: "3%", bottom: "5%", width: "75px", height: "75px", borderRadius: "50%" }}></Button></a>
          <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} style={{ height: "auto" }}>
            <EditVenue keyId={this.state.getId} />
          </Modal>
        </div>
      </div>
    )
  }
}
export default ViewVenue;