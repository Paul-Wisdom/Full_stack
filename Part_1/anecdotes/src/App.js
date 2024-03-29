import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}
const  App = () => {
const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]
const [selected, setSelect] = useState(0);
const [votes, setVotes] = useState([0,0,0,0,0,0,0,0]);
const rng = () => {
  const r = (Math.random() * 100) % 8;
  const n = Math.floor(r);
  setSelect(n);
}
const vote = () => {
  const copyVotes = [...votes];
  copyVotes[selected] += 1;
  setVotes(copyVotes);
}
const maxVotes =() => {
  const copy = [...votes];
  const max = Math.max(...copy);
  const maxAnecIndex = copy.findIndex(p => p === max);
  return maxAnecIndex;
}
return(
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
    <Button text="vote" clickHandler={vote} />
    <Button text="next anecdote" clickHandler={rng} />
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[maxVotes()]}</p>
    <p>has {votes[maxVotes()]} votes</p>
  </div>
)

}

export default App;
