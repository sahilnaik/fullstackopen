import React, { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const all = good + neutral + bad;
  const average = (good-bad)/all;
  const positive = good / all * 100;
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />

        </tbody>
      </table>
    </div>
  )

}

const Button = (props) => {
  const { handleClick, text } = props;

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleSetGood =() => {
    setGood(good +1);
  }
  const handleSetNeutral =() => {
    setNeutral(neutral +1);
  }
  const handleSetBad =() => {
    setBad(bad +1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleSetGood} text='good'>  </Button>
      <Button handleClick={handleSetNeutral} text='neutral'>  </Button>
      <Button handleClick={handleSetBad} text='bad'>  </Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App