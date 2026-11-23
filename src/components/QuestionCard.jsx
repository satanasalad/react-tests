import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

function QuestionCard({
  question,
  step,
  total,
  lives,
  value,
  onChange,
  onSubmit
}) {
  const cardRef = useRef(null)

  // когда меняется вопрос, ставим фокус на карточку
  useEffect(() => {
    cardRef.current.focus()
  }, [question.id])

  function handleSubmit(event) {
    event.preventDefault()

    if (value) {
      onSubmit(value)
    }
  }

  return (
    <section className="card" ref={cardRef} tabIndex={-1}>
      <p>
        Вопрос {step + 1} из {total} · Жизни: {lives}
      </p>

      <h2>{question.text}</h2>

      <form onSubmit={handleSubmit}>
        {question.type === 'text' ? (
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Ваш ответ"
          />
        ) : (
          question.options.map((option) => (
            <label className="option" key={option}>
              <input
                type="radio"
                name="answer"
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))
        )}

        <button type="submit" disabled={!value}>
          Ответить
        </button>
      </form>
    </section>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['choice', 'truefalse', 'text']).isRequired,
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct: PropTypes.string.isRequired
  }).isRequired,
  step: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default QuestionCard
