import React, { Component } from 'react'
//import './InterestPage.css';
//import inter from '../Interests/ints'; 
import Search from './Search';
import OptionList from './OptionList';
import InterestList from './InterestList';
//import './index.css';

//require('normalize-css');


const inter =  [
  {
    id: 0,
    inter: '3D printing'
    },
    {
    id: 1,
    inter: 'Acting'
    },
    {
    id: 2,
    inter: 'Aeromodeling'
    },
    {
    id: 3,
    inter: 'Air sports'
    },
    {
    id: 4,
    inter: 'Airbrushing'
    },
    {
    id: 5,
    inter: 'Aircraft Spotting'
    },
    {
    id: 6,
    inter: 'Airsoft'
    },
    {
    id: 7,
    inter: 'Airsofting'
    },
    {
    id: 8,
    inter: 'Amateur astronomy'
    },
    {
    id: 9,
    inter: 'Amateur geology'
    },
    {
    id: 10,
    inter: 'Amateur Radio'
    },
    {
    id: 11,
    inter: 'American football'
    },
    {
    id: 12,
    inter: 'Animal fancy'
    },
    {
    id: 13,
    inter: 'Animals/pets/dogs'
    },
    {
    id: 14,
    inter: 'Antiquing'
    },
    {
    id: 15,
    inter: 'Antiquities'
    },
    {
    id: 16,
    inter: 'Aqua-lung'
    },
    {
    id: 17,
    inter: 'Aquarium (Freshwater & Saltwater)'
    },
    {
    id: 18,
    inter: 'Archery'
    },
    {
    id: 19,
    inter: 'Art collecting'
    },
    {
    id: 20,
    inter: 'Arts'
    },
    {
    id: 21,
    inter: 'Association football'
    },
    {
    id: 22,
    inter: 'Astrology'
    },
    {
    id: 23,
    inter: 'Astronomy'
    },
    {
    id: 24,
    inter: 'Audiophilia'
    },
    {
    id: 25,
    inter: 'Australian rules football'
    },
    {
    id: 26,
    inter: 'Auto audiophilia'
    },
    {
    id: 27,
    inter: 'Auto racing'
    },
    {
    id: 28,
    inter: 'Backgammon'
    },
    {
    id: 29,
    inter: 'Backpacking'
    },
    {
    id: 30,
    inter: 'Badminton'
    },
    {
    id: 31,
    inter: 'Base Jumping'
    },
    {
    id: 32,
    inter: 'Baseball'
    },
    {
    id: 33,
    inter: 'Basketball'
    },
    {
    id: 34,
    inter: 'Baton Twirling'
    },
    {
    id: 35,
    inter: 'Beach Volleyball'
    },
    {
    id: 36,
    inter: 'Beach/Sun tanning'
    },
    {
    id: 37,
    inter: 'Beachcombing'
    },
    {
    id: 38,
    inter: 'Beadwork'
    },
    {
    id: 39,
    inter: 'Beatboxing'
    },
    {
    id: 40,
    inter: 'Becoming A Child Advocate'
    },
    {
    id: 41,
    inter: 'Beekeeping'
    },
    {
    id: 42,
    inter: 'Bell Ringing'
    },
    {
    id: 43,
    inter: 'Belly Dancing'
    },
    {
    id: 44,
    inter: 'Bicycle Polo'
    },
    {
    id: 45,
    inter: 'Bicycling'
    },
    {
    id: 46,
    inter: 'Billiards'
    },
    {
    id: 47,
    inter: 'Bird watching'
    },
    {
    id: 48,
    inter: 'Birding'
    },
    {
    id: 49,
    inter: 'Birdwatching'
    },
    {
    id: 50,
    inter: 'Blacksmithing'
    },
    {
    id: 51,
    inter: 'Blogging'
    },
    {
    id: 52,
    inter: 'BMX'
    },
    {
    id: 53,
    inter: 'Board games'
    },
    {
    id: 54,
    inter: 'Board sports'
    },
    {
    id: 55,
    inter: 'BoardGames'
    },
    {
    id: 56,
    inter: 'Boating'
    },
    {
    id: 57,
    inter: 'Body Building'
    },
    {
    id: 58,
    inter: 'Bodybuilding'
    },
    {
    id: 59,
    inter: 'Bonsai Tree'
    },
    {
    id: 60,
    inter: 'Book collecting'
    },
    {
    id: 61,
    inter: 'Bookbinding'
    },
    {
    id: 62,
    inter: 'Boomerangs'
    },
    {
    id: 63,
    inter: 'Bowling'
    },
    {
    id: 64,
    inter: 'Boxing'
    },
    {
    id: 65,
    inter: 'Brazilian jiu-jitsu'
    },
    {
    id: 66,
    inter: 'Breakdancing'
    }
]; 


class InterestPage extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      initText: '',
       list: []

    };
  }

  addInterest(id) {
    const options = this.state.list.concat([id])
    this.setState({
     list: options
    });

   }

   removeInterest(inter) {
    const { list } = this.state
    //list = list.slice(id)
    
    const id = list.indexOf(inter.id); 
    console.log('real id to be removed', id)
    //console.log('id to be removed', inter.id)
    const newList = list
    newList.splice(id,1)  
    this.setState({
      list: newList
    });
  }
 

  update(val) {
    //var options = this.state.initText
   // const options = this.state.list.concat([3])
    this.setState({
      initText: val
     // list: options
    });
  }

  
  render() {
    //const options = this.state.list;
console.log('render', this.state.list)
//const inter = [1,2,3,4]
    return(
<div>
  <Search 
  initText={this.state.initText}
  update = {this.update.bind(this)}
  />
  <main>
    <OptionList 
    picked = {this.state.list}
    intList = {inter}
    removeint = {this.removeInterest.bind(this)}
     />

  <InterestList 
  inter={inter}
  initText = {this.state.initText}
  addint={this.addInterest.bind(this)}
  pickedList = {this.state.list}

  />
</main>
</div>
    )
  }
}

export default InterestPage;
