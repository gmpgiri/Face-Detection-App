import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';  
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
  apiKey: '5dd0d25a47e9499f837ad88938e5843f' 
})

const particleOptions = {
  particles:{
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
    }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {}
    }
  }
  onInputChange = (event)=> {
    this.setState({input : event.target.value});
  }

  calculateFaceLocation = (data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);  
    const height = Number(inputImage.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottom: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box:box});
    console.log(box);
  }

  onSubmit = ()=>{
    this.setState({imageUrl : this.state.input});

    app.models.predict(
       Clarifai.FACE_DETECT_MODEL,
       this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(error => console.log(error))
  }
    
    
  

  render(){
    return (
      <div className="App">
      <Particles className='particles'
        params={particleOptions}
      />
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onSubmit={this.onSubmit} 
      />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
