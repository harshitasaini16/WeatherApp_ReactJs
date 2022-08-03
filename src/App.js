import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./AppComponent/WeatherComponent";
import Form from "./AppComponent/FormComponent";
const API_Key = "1849b1b38e33b313fc139e8c683e432d";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_main: undefined,
      description: "",
      error: false,
    };
  }
  calCelsius(temp){
    let cell = Math.floor(temp-273.15);
    return cell;
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
      );
    const response = await api_call.json();
    console.log(response);
    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description
    });
  }
  else{
    this.setState({error:true});
  }
  };
  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
