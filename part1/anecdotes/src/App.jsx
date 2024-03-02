import { useState } from 'react';

const Title = ({ title }) => {
  return <h1>{title}</h1>;
};

const Anecdotes = ({ anecdotes, voted }) => {
  return (
    <div>
      <p>{anecdotes}</p>
      <p>has {voted} votes</p>
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * anecdotes.length);
  };
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));

  const clickVote = () => {
    const newVotes = [...voted];
    newVotes[selected] += 1;
    setVoted(newVotes);
  };

  const maxVoted = Math.max(...voted);
  const index = voted.indexOf(maxVoted);

  console.log(voted);
  console.log(getRandomInt);
  return (
    <div>
      <Title title="Anecdote of the day" />
      <Anecdotes anecdotes={anecdotes[selected]} voted={voted[selected]} />
      <Button handleClick={clickVote} text="vote" />
      <Button
        handleClick={() => {
          setSelected(getRandomInt);
        }}
        text="next anecdote"
      />
      <Title title="Anecdote with most votes" />
      <Anecdotes anecdotes={anecdotes[index]} voted={voted[index]} />
    </div>
  );
}

export default App;
