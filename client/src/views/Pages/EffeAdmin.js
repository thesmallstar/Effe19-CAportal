import React from "react";
import firebase from '../../firebase/firebase';
import { Link } from "react-router-dom";
import moment from 'moment';
class AdminPage extends React.Component {
  
      state={
            taskTitle:'',
            note:'',
            points:0,
            success:false,
            createdAt:moment().valueOf()
      };

      onTitleChange = e => {
            this.setState({
                  taskTitle: e.target.value
            });
      };

      onNoteChange = e => {
            this.setState({
                  note: e.target.value
            });
      };

      onPointsChange = e => {
            this.setState({
                  points: parseInt(e.target.value)
            });
      };

      onSubmitForm = e => {
            e.preventDefault();
            // Some Custom Validation.
           
            firebase.database().ref('TASKS').push({
                  task:this.state.taskTitle,
                  points:this.state.points,
                  note:this.state.note,
                  createdAt:this.state.createdAt
            }).then(()=>{
                  console.log('SuccessFully Added Task to Database');
                  this.setState({
                        taskTitle:'',
                        note:'',
                        points:0,
                        success:true
                  });
            }).catch((e)=>{
                  console.log(e);
            });
      };

      render() {
      
      return (
            <div>
                  <h1>Welcome Admin !</h1>
                  {this.state.success && <h3>SuccessFully Added Task</h3>}
                  <form onSubmit={this.onSubmitForm}>
                        <input
                              type="text"
                              placeholder="Task Title"
                              value={this.state.taskTitle}
                              onChange={this.onTitleChange}
                        />

                        <textarea
                              type="text"
                              placeholder="Link"
                              value={this.state.note}
                              onChange={this.onNoteChange}
                        />

                        <input
                              type="number"
                              placeholder="Points"
                              value={this.state.points}
                              onChange={this.onPointsChange}
                        />

                        <button type="submit">Submit</button>
                        <button>
                              <Link to="/">Home</Link>
                        </button>
                  </form>
            </div>
      );
      }
}

export default AdminPage;
