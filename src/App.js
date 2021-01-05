import React, { Component } from 'react';
import './App.scss';
import Card from './Card';
import data from './data';

// class component
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      properties: data.properties,
      property: data.properties[0],
      bedCount: 0
    }
  }

  nextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({
      property: this.state.properties[newIndex]
    })
  }

  prevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({
      property: this.state.properties[newIndex]
    })
  }
  handleBedCountChange = (e) => {
    if(e.target.value =="all") {
      for(let i =0;i<data.properties.length;i++) {
        data.properties[i].index = i;
      }
      this.setState({
        bedCount: "Select number of bedrooms",
        properties: data.properties,
        property: data.properties[0]
      });
      return;
    }
    console.log(e.target.value)
    let modProperties = data.properties.filter((property) => {
      return property.bedrooms == e.target.value;
    })
    for(let i =0;i<modProperties.length;i++) {
      modProperties[i].index = i;
    }
    this.setState({
      bedCount: e.target.value,
      properties: modProperties,
      property: modProperties[0]
    });

  }

  render() {
    const { properties, property } = this.state;
    return (
      <div className="App">

        <button className='right-arrow'
          onClick={() => this.nextProperty()}
          disabled={property.index === data.properties.length - 1}
        >Next</button>
        <button className='left-arrow'
          onClick={() => this.prevProperty()}
          disabled={property.index === 0}
        >Prev</button>

        <div className="page">
          <section>
            <h1>Image Carousel</h1>
          </section>
          <select class="bedroomFilter" value={this.state.bedCount} onChange={this.handleBedCountChange}>
            <option value="all">Select number of bedrooms</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className="col">
            <div className={`cards-slider active-slide-${property.index}`}>
              <div className="cards-slider-wrapper" style={{
                'transform': `translateX(-${property.index * (100 / properties.length)}%)`
              }}>
                {
                  properties.map(property => <Card key={property._id} property={property} />)
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
