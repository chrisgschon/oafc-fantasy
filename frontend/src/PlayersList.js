import  React, { Component } from  'react';
import  PlayersService  from  './PlayersService';

const  playersService  =  new  PlayersService();

class  PlayersList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        players: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    playersService.getPlayers().then(function (result) {
        console.log(result);
        self.setState({ players:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    playersService.deletePlayer({pk :  pk}).then(()=>{
        var  newArr  =  self.state.players.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({players:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);        
    playersService.getPlayersByURL(this.state.nextPageURL).then((result) => {
        self.setState({ players:  result.data, nextPageURL:  result.nextlink})
    });
}
render() {

    return (
        <div  className="players--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.players.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.email}</td>
                <td>{c.description}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Delete</button>
                <a  href={"/player/" + c.pk}> Update</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Next</button>
        </div>
        );
  }
}
export  default  PlayersList;