import logo from './logo.svg';
import {useState, useEffect} from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

const ShowButton = ({country, setInputCountries, setCountry}) => {
  const onClick = () =>{
    setInputCountries([country]);
    setCountry(country);}

  return(
    <button onClick = {onClick}>show</button>
  )
}

const Display = ({countries, setCountry, conData, setInputCountries}) => {

  if(countries === null){
    return(
      <p>Enter filter</p>
    )
  }
  if(countries.length === 0){
    return(
      <p>No match found</p>
    )
  }

  if (countries.length > 10)
  {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length <= 10 & countries.length > 1)
  {
    return(
      <div>
        {countries.map(c => {
          return <p key= {c}>{c} <ShowButton country={c} setInputCountries={setInputCountries} setCountry={setCountry}/></p>
        })}
      </div>
    )
  }
  if (countries.length === 1)
  {
    setCountry(countries[0]);
    if(conData !== null)
    {
      const languages = Object.values(conData.languages);
      return(
        <div>
          <h1>{conData.name}</h1>
          <p>capital {conData.capital[0]}</p>
          <p>area {conData.area}</p>
          <h2>languages:</h2>
          <ul>
            {languages.map(l => {
              return <li>{l}</li>
            })}
          </ul>
          <img src={conData.flag.svg} alt={conData.flag.alt} />
          <h1>Weather in {conData.capital[0]}</h1>
          <p>temperature {conData.temp} Celsius</p>
          <img src={conData.icon} alt='Weather condition'/>
          <p>wind {conData.wind.toFixed(3)}m/s</p>
        </div>
      )
    }
  }

}

function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [newInput,setNewInput] = useState('');
  const [inputCountries, setInputCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [conData, setConData] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      // console.log(response.data);
      const countries = response.data.map(c => c.name.common);
      setAllCountries(countries);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    if(country !== null){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`).then(response => {
        const data = response.data;
        let countryData = {name: data.name.common, capital: data.capital, area: data.area, languages : data.languages, flag: data.flags};
        // setConData(countryData);
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${data.capital[0]}`).then(res => {
         const data = res.data;
          const wind = (data.current.wind_kph * 1000) / 3600;
          countryData = {...countryData, temp: data.current.temp_c, icon: data.current.condition.icon, wind: wind}
          setConData(countryData);
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }, [country]);

  const onChange = (e) => {
    const search = e.target.value;
    setNewInput(search);
    const newCountries = allCountries.filter(c => c.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    setInputCountries(newCountries);
  }
  return (
    <div >
      <p>find countries<input type= 'search' value={newInput} onChange={onChange}></input></p>
      <Display countries={inputCountries} setCountry={setCountry} conData ={conData} setInputCountries={setInputCountries} />
      Powered by <a href='https://www.weatherapi.com/' title='Free Weather API'>WeatherAPI.com</a>
      <a href='https://www.weatherapi.com/' title='Free Weather API'>
        <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt='Weather data by WeatherAPI.com' border='0'></img>
      </a>
    </div>
  );
}

export default App;
