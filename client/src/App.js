import React from 'react';
import './App.css';
import {MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdbreact";
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment-timezone'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      //  modal : false,
      users : []
    }
  }

  componentDidMount(){
    axios.get('/api/users')
    .then(response=>{
        const users = response.data
        users.forEach(element => {
          element.modal = false
        });
        this.setState({users})
      }
      )
    .catch(err=>console.log(err))
  }
  toggle = (user) => {
    console.log(user)
    const users = this.state.users
    users.forEach(element=>{
      if(element.id===user.id){
        element.modal = !element.modal
      }
    })
    console.log(users)

    this.setState({users})
  }

  render(){
    return (
      <>
      <div className="App">
      <MDBCard className="my-5 px-5 pb-5">
        <MDBCardBody>
          <h2 className="h1-responsive font-weight-bold my-5">
            Users Activity
          </h2>
          <p className="grey-text w-responsive mx-auto mb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
          <MDBRow >
            {this.state.users.map((user,i)=>{
              return (
                <MDBCol key={user.id} lg="3" md="6" className="mb-lg-0 mb-5">
                <img
                  tag="img"
                  src={`https://mdbootstrap.com/img/Photos/Avatars/img%20(3${i}).jpg`}
                  className="rounded-circle z-depth-1 img-fluid"
                  alt="Sample avatar"
                />
                <h5 className="font-weight-bold mt-4 mb-3">{user.real_name}</h5>
                <MDBBtn color="secondary" onClick={()=>this.toggle(user)}>View Activity</MDBBtn>
                <MDBModal isOpen={user.modal} toggle={()=>this.toggle(user)} size="lg" >
                  <MDBModalHeader toggle={()=>this.toggle(user)}> {user.real_name}'s Activity</MDBModalHeader>
                  <MDBModalBody>
                    {/* {user.activity_periods.map((period,i)=>{
                      return (
                      <li key={i}>{period.start_time}-{period.end_time}</li>
                      )

                    })} */}
                    <FullCalendar 
                      defaultView="dayGridDay" 
                      plugins={[dayGridPlugin,timeGridPlugin, interactionPlugin]}
                      header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                      }}
                      displayEventEnd={true}
                      events= {
                        user.activity_periods.map(activity_period => {
                          const {end_time, start_time} = activity_period
              
                          let startTime = moment.tz(start_time,'MMM D YYYY hh:mmA',user.tz).format()
                          let endTime = moment.tz(end_time,'MMM D YYYY hh:mmA',user.tz).format()
                          console.log(new Date())
                          return {
                            start: startTime,
                            end: endTime
                          }
                      })
                      }
                      // events={[
                      //   { title: 'event 1', start: new Date() },
                      //   { title: 'event 2', start: new Date() }
                      // ]}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={()=>this.toggle(user)}>Close</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
              </MDBCol>
              
    
            )})}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      </div>
        </>);
  }
}

export default App;
