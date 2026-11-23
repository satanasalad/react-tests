import PropTypes from 'prop-types'

function Result({ testTitle, score, total, onRetry, onExit }) {
  const percent = Math.round((score / total) * 100)

  return (
    <div className="card">
      <h2>Тест завершён</h2>
      <p>{testTitle}</p>
      <p className="score">
        {score} из {total} ({percent}%)
      </p>

      <button onClick={onRetry}>Пройти снова</button>
      <button onClick={onExit}>К списку тестов</button>
    </div>
  )
}

Result.propTypes = {
  testTitle: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRetry: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired
}

export default Result
