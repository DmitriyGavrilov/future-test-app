import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';

function App() {
  return (
    <div className="App">
      <Header />
      <ItemList />
    </div>
  );
}

// getObjects.getAllObjects().then((people) => {
//   // console.log(people);
//   people.forEach((element) => {
//     console.log(element.firstName);
//   });
// });
// getObjects.getPerson(0).then((people) => {
//   console.log('Person: ', people.firstName);
// });

export default App;