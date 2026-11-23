import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import QuestionCard from './QuestionCard'
import Result from './Result'

const START_LIVES = 3

function Quiz({ test, onExit }) {
  const [step, setStep] = useState(0)
  const [value, setValue] = useState('')
  const [answers, setAnswers] = useState([])
  const [lives, setLives] = useState(START_LIVES)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)

  const question = test.questions[step]

  function submitAnswer(answer) {
    const correct =
      answer.trim().toLowerCase() === question.correct.trim().toLowerCase()

    setAnswers([...answers, { id: question.id, correct }])
    setValue('')

    const nextLives = correct ? lives : lives - 1
    setLives(nextLives)

    if (nextLives === 0 || step + 1 === test.questions.length) {
      setFinished(true)
    } else {
      setStep(step + 1)
    }
  }

  // подсчёт результата, когда тест закончен
  useEffect(() => {
    if (finished) {
      setScore(answers.filter((answer) => answer.correct).length)
    }
  }, [finished, answers])

  function restart() {
    setStep(0)
    setValue('')
    setAnswers([])
    setLives(START_LIVES)
    setFinished(false)
    setScore(0)
  }

  if (finished) {
    return (
      <Result
        testTitle={test.title}
        score={score}
        total={test.questions.length}
        onRetry={restart}
        onExit={onExit}
      />
    )
  }

  return (
    <QuestionCard
      question={question}
      step={step}
      total={test.questions.length}
      lives={lives}
      value={value}
      onChange={setValue}
      onSubmit={submitAnswer}
    />
  )
}

Quiz.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['choice', 'truefalse', 'text']).isRequired,
        text: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correct: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onExit: PropTypes.func.isRequired
}

export default Quiz
