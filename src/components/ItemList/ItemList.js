import React, { Component } from 'react';
import classes from './ItemList.module.css';
import FetchService from '../../services/fetch-service';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

export default class ItemList extends Component {

    state = {
        peopleList: null,
        sortId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        showInputs: false
    };

    fetchService = new FetchService();

    constructor(props) {
        super();
        this.getPerson(props.quantity);
    }

    getPerson = (quantity) => {
        this.fetchService.getAllObjects(quantity).then((person) => {
            this.setState({
                peopleList: person
            })
        });
    }
    sortUpMethod = (name) => {
        if (this.state.peopleList !== null) {
        const sortedPerson = this.state.peopleList.sort(function(a,b){
            if (a[name] < b[name]) {
                return -1;
            }
            if (a[name] > b[name]) {
                return 1;
            }
            return 0; 
        });
        console.log(this.state.peopleList);
        this.setState({
             peopleList: sortedPerson,
             sortId: !this.state.sortId
        });
        }
    };

    sortDownMethod = (name) => {
        if (this.state.peopleList !== null) {
        const sortedPerson = this.state.peopleList.sort(function(a,b){
            if (a[name] > b[name]) {
                return -1;
            }
            if (a[name] < b[name]) {
                return 1;
            }
            return 0; 
        });
        console.log(this.state.peopleList);
        this.setState({
             peopleList: sortedPerson,
             sortId: !this.state.sortId
        });
        }
    };

    sortUpStrMethod = (name) => {
        if (this.state.peopleList !== null) {
        const sortedPerson = this.state.peopleList.sort(function(a,b){
            let nameA=a[name].toLowerCase(), nameB=b[name].toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; 
        });
        this.setState({
             peopleList: sortedPerson,
             [name]: !this.state[name]
        });
        }
    };

    sortDownStrMethod = (name) => {
        if (this.state.peopleList !== null) {
        const sortedPerson = this.state.peopleList.sort(function(a,b){
            let nameA=a[name].toLowerCase(), nameB=b[name].toLowerCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0; 
        });
        this.setState({
             peopleList: sortedPerson,
             [name]: !this.state[name]
        });
        }
    };

    showInputs = () => {
        this.setState({
            showInputs: true
        })
    }

    render() {
        // console.log(this.state.peopleList);
        const angleUp =  <i className="fa fa-angle-up"></i>;
        const angleDown =  <i className="fa fa-angle-down"></i>;

        return (
        <div className={classes.ItemList}>
            <button onClick={this.showInputs}>Добавить</button>
            {this.state.showInputs ? <div className={classes.Inputs}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" /></div> : null}
            <table className="table">
                <thead>
                    <tr className={classes.Tr}>
                        <th scope="col">#</th>
                        <th onClick={this.state.sortId ? () => this.sortUpMethod('id'): () => this.sortDownMethod('id')} 
                            scope="col">id {this.state.sortId ? angleDown : angleUp}</th>
                        <th onClick={this.state['firstName'] ? () => this.sortUpStrMethod('firstName') : () => this.sortDownStrMethod('firstName')} scope="col">First {this.state['firstName'] ? angleDown : angleUp}</th>
                        <th onClick={this.state['lastName'] ? () => this.sortUpStrMethod('lastName') : () => this.sortDownStrMethod('lastName')} scope="col">Last {this.state['lastName'] ? angleDown : angleUp}</th>
                        <th onClick={this.state['email'] ? () => this.sortUpStrMethod('email') : () => this.sortDownStrMethod('email')} scope="col">Email {this.state['email'] ? angleDown : angleUp}</th>
                        <th onClick={this.state['phone'] ? () => this.sortUpStrMethod('phone') : () => this.sortDownStrMethod('phone')} scope="col">Phone {this.state['phone'] ? angleDown : angleUp}</th>
                    </tr>
                </thead>
                <tbody>
                        {this.state.peopleList !== null ? this.state.peopleList.map((person, index) => {
                            index = ++index;
                             return <Item
                             key={person.id + Math.random()}
                             index={index}
                             id={person.id}
                             firstName={person.firstName} 
                             lastName={person.lastName} 
                             email={person.email} 
                             phone={person.phone} />
                        }) : <tr><th>Loading <Loading /></th></tr>}
                </tbody>
            </table>
        </div>)
    }
}