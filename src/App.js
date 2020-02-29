import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';

export default class App extends Component {

  state = {
    loadList: false,
    quantity: null,
    showBtnList: true
  }

  showList = (number) => {
    this.setState({
      loadList: true,
      quantity: number,
      showBtnList: false
    });
  }

  render() {
    const quantity = this.state.quantity;
    // console.log('[App.js] quantity: ', quantity);
    return (
      <div className="App">
        <Header />
        {this.state.showBtnList ? <button onClick={() => this.showList(32)}>Список 32</button> : null}
        {this.state.showBtnList ? <button onClick={() => this.showList(1000)}>Список 1000</button> : null}
        {this.state.loadList ? <ItemList quantity={quantity} /> : null}
      </div>
    );
  }
}