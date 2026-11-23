import PropTypes from 'prop-types'

function TestList({ tests, onStart, onCreate }) {
  return (
    <div>
      <button onClick={onCreate}>Создать тест</button>

      <ul className="test-list">
        {tests.map((test) => (
          <li className="card" key={test.id}>
            <h2>{test.title}</h2>
            <p>Вопросов: {test.questions.length}</p>
            <button onClick={() => onStart(test)}>Пройти</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

TestList.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      questions: PropTypes.array.isRequired
    })
  ).isRequired,
  onStart: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default TestList
