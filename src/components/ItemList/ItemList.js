import React, { Component } from 'react';
import classes from './ItemList.module.css';
import FetchService from '../../services/fetch-service';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

export default class ItemList extends Component {

    state = {
        peopleLargeList: null,
        numForShow: 0,
        peopleList: null,
        sortId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        showInputs: false,
        showMore: false,
        allPeopleList: null,
        showWarning: false,
    };

    fetchService = new FetchService();

    constructor(props) {
        super();
        this.getPerson(props.quantity);
    }

    getPerson = (quantity) => {
        this.fetchService.getAllObjects(quantity).then((person) => {
            if (quantity === 1000) {
                this.setState({
                    peopleLargeList: person
                });
                person = person.slice(0, 50);
                this.setState({
                    showMore: true,
                    numForShow: 100
                })
            }
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

    showMorePeople = () => {
        // console.log('[ItemList.js] ', this.state.peopleList);
        // console.log('[ItemList.js] ', this.state.peopleLargeList);
        if (this.state.peopleList.length !== 1000 ) {
            const person = this.state.peopleLargeList.slice(0, this.state.numForShow);
            const numForPlus = this.state.numForShow + 50;
            this.setState({
                peopleList: person,
                numForShow: numForPlus
            });
        } else {
            this.setState({
                showMore: false
            })
        }
    }

    searchBtn = () => {
        let inputVal = document.getElementById('inputForSearch').value;
        let itemsList = this.state.peopleList;
        // console.log('[ItemList.js] inputVal', inputVal);
        if (this.state.peopleLargeList) {
            itemsList = this.state.peopleLargeList;
            // allItemsList = this.state.peopleLargeList;
        }
        let filteredItems = itemsList.filter((item) => {
            return String(item.id).indexOf(inputVal) > -1;
        });
        const filterFunc = (name) => {
            if (filteredItems[0] !==  undefined){
                filteredItems = filteredItems.concat(itemsList.filter((item) => {
                    if (typeof(item[name]) == "number") {
                        return item[name].indexOf(inputVal) > -1;
                    } else {
                        return item[name].toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
                    }
                }))
            } else {
                filteredItems =  itemsList.filter((item) => {
                    if (typeof(item[name]) == "number") {
                        return item[name].indexOf(inputVal) > -1;
                    } else {
                        return item[name].toLowerCase().indexOf(inputVal.toLowerCase()) > -1;
                    }
                });
            }
        };
        const arrOfNames =['firstName', 'lastName', 'email', 'phone'];
        let i = 0;
        while (arrOfNames[i]) {
            filterFunc(arrOfNames[i]);
            i++;
        }
        // console.log('[ItemList.js] event.target.value', event.target.value);
        if ( inputVal ) {
            this.setState({
                peopleList: filteredItems,
                showWarning: false,
                showMore: false
            });
            // console.log('[ItemList.js] if', this.state.peopleList);  
        } else {
            this.setState({
                showWarning: true,
            })
            // console.log('[ItemList.js] else', this.state.peopleList);
        }
    }
    clearSearch = () => {
        this.getPerson(this.props.quantity);
        document.getElementById('inputForSearch').value = '';
    }

    // addItem = (text) => {
    //     const newItem = this.createTodoItem(text);        

    //     this.setState(({todoData}) => {
    //         const newArr = [
    //             ...todoData, 
    //             newItem
    //         ];
            
    //         return {
    //             todoData: newArr
    //         }
    //     });
    // };

    render() {
        // console.log(this.state.peopleList);
        const angleUp =  <i className="fa fa-angle-up"></i>;
        const angleDown =  <i className="fa fa-angle-down"></i>;

        return (
        <div className={classes.ItemList}>
            {/* <button onClick={this.showInputs}>Добавить</button> */}
            <input className={classes.Input} id='inputForSearch' type="text"  placeholder="введите текст" />
            <button onClick={this.searchBtn}>Найти</button>
            <button onClick={this.clearSearch}>Сбросить</button>
            {this.state.showInputs ? <div className={classes.Inputs}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" /></div> : null}
                {this.state.showWarning ? <div className="alert alert-danger" role="alert">Введите текст!</div> : null}
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
            {this.state.showMore ? <button onClick={this.showMorePeople}>Показать ещё</button> : null}
        </div>)
    }
}