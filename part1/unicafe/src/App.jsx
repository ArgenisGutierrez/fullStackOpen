import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feddback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={good} />
          <StatisticsLine text={'neutral'} value={neutral} />
          <StatisticsLine text={'bad'} value={bad} />
          <StatisticsLine text={'average'} value={(good - bad) / all} />
          <StatisticsLine text={'positive'} value={good / all * 100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ text, handleclick }) => {
  return (
    <button onClick={handleclick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToGood = (newValue) => {
    setAll(all + 1)
    setGood(newValue)
  }

  const setToNeutral = (newValue) => {
    setAll(all + 1)
    setNeutral(newValue)
  }

  const setToBad = (newValue) => {
    setAll(all + 1)
    setBad(newValue)
  }
  return (
    <div>
      <h2>
        give feedback
      </h2>
      <Button handleclick={() => setToGood(good + 1)} text={'good'} />
      <Button handleclick={() => setToNeutral(neutral + 1)} text={'neutral'} />
      <Button handleclick={() => setToBad(bad + 1)} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
