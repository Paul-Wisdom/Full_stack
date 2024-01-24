import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Button = ({ name, clickHandler }) => (
  <button onClick={clickHandler}> {name} </button>
)
const Statisticline = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  console.log(total);
  if (total < 1) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statisticline text='good' value={good} />
            <Statisticline text='neutral' value={neutral} />
            <Statisticline text='bad' value={bad} />
            <Statisticline text='all' value={total} />
            <Statisticline text='average' value={average} />
            <Statisticline text='positive' value={positive + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
}
const App = () => {

  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const handleGood = () => {
    setGood(good + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' clickHandler={handleGood} />
      <Button name='neutral' clickHandler={handleNeutral} />
      <Button name='bad' clickHandler={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
