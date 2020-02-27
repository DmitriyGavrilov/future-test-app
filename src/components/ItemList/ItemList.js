import React, { Component } from 'react';
import classes from './ItemList.module.css';
import FetchService from '../../services/fetch-service';
import Item from '../Item/Item';

export default class ItemList extends Component {

    state = {
        peopleList: null
    };

    fetchService = new FetchService;

    constructor() {
        super();
        this.getPerson();
    }

    getPerson() {
        this.fetchService.getAllObjects().then((person) => {
            this.setState({
                peopleList: person
            })
        });
    }

    sortMethod = () => {
        const sortedPerson = this.state.peopleList.sort(function(a,b){
            return a.id - b.id;
          });
        this.setState({
             peopleList: sortedPerson
        });
    };

    render() {
        // console.log(this.state.peopleList);
        return (
        <div className={classes.ItemList}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th onClick={this.sortMethod} scope="col">id</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                        {this.state.peopleList !== null ? this.state.peopleList.map((person, index) => {
                            index = ++index;
                             return <Item
                             key={person.id}
                             index={index}
                             id={person.id}
                             firstName={person.firstName} 
                             lastName={person.lastName} 
                             email={person.email} 
                             phone={person.phone} />
                        }) : <tr><th>Loading ...</th></tr>}
                </tbody>
            </table>
        </div>)
    }
}