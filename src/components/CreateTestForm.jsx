import { Component, createRef } from 'react'
import PropTypes from 'prop-types'

class CreateTestForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      type: 'choice',
      text: '',
      options: ['', '', ''],
      correct: '',
      questions: [],
      error: ''
    }

    this.textRef = createRef()
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, error: '' })
  }

  handleType = (event) => {
    this.setState({
      type: event.target.value,
      options: ['', '', ''],
      correct: '',
      error: ''
    })
  }

  handleOption = (index, value) => {
    const options = [...this.state.options]
    options[index] = value

    this.setState({ options, correct: '', error: '' })
  }

  addQuestion = (event) => {
    event.preventDefault()

    const { type, text, options, correct, questions } = this.state
    const answer = correct.trim()
    let questionOptions = []

    if (!text.trim()) {
      this.setState({ error: 'Введите текст вопроса' })
      return
    }

    if (type === 'choice') {
      questionOptions = options.map((option) => option.trim()).filter(Boolean)

      if (questionOptions.length < 2) {
        this.setState({ error: 'Нужно минимум два варианта ответа' })
        return
      }
    }

    if (type === 'truefalse') {
      questionOptions = ['Правда', 'Ложь']
    }

    if (!answer) {
      this.setState({ error: 'Укажите правильный ответ' })
      return
    }

    if (type === 'choice' && !questionOptions.includes(answer)) {
      this.setState({ error: 'Выберите правильный вариант из списка' })
      return
    }

    const question = {
      id: Date.now(),
      type,
      text: text.trim(),
      options: questionOptions,
      correct: answer
    }

    this.setState({
      questions: [...questions, question],
      text: '',
      options: ['', '', ''],
      correct: '',
      error: ''
    })

    // сброс формы: курсор возвращается в поле вопроса
    this.textRef.current.focus()
  }

  saveTest = () => {
    const { title, questions } = this.state

    if (!title.trim()) {
      this.setState({ error: 'Введите название теста' })
      return
    }

    if (questions.length === 0) {
      this.setState({ error: 'Добавьте хотя бы один вопрос' })
      return
    }

    this.props.onSave({
      id: Date.now(),
      title: title.trim(),
      questions
    })
  }

  render() {
    const { title, type, text, options, correct, questions, error } = this.state

    return (
      <div className="card">
        <h2>Новый тест</h2>

        <input
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Название теста"
        />

        <form onSubmit={this.addQuestion}>
          <select name="type" value={type} onChange={this.handleType}>
            <option value="choice">Несколько вариантов</option>
            <option value="truefalse">Правда или ложь</option>
            <option value="text">Ввести слово</option>
          </select>

          <input
            name="text"
            ref={this.textRef}
            value={text}
            onChange={this.handleChange}
            placeholder="Текст вопроса"
          />

          {type === 'choice' && (
            <>
              {options.map((option, index) => (
                <input
                  key={index}
                  value={option}
                  onChange={(event) => this.handleOption(index, event.target.value)}
                  placeholder={'Вариант ' + (index + 1)}
                />
              ))}

              <select name="correct" value={correct} onChange={this.handleChange}>
                <option value="">Правильный ответ</option>
                {options
                  .filter((option) => option.trim())
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </>
          )}

          {type === 'truefalse' && (
            <select name="correct" value={correct} onChange={this.handleChange}>
              <option value="">Правильный ответ</option>
              <option value="Правда">Правда</option>
              <option value="Ложь">Ложь</option>
            </select>
          )}

          {type === 'text' && (
            <input
              name="correct"
              value={correct}
              onChange={this.handleChange}
              placeholder="Правильный ответ"
            />
          )}

          {error && <p className="error">{error}</p>}

          <button type="submit">Добавить вопрос</button>
        </form>

        {questions.length > 0 && (
          <div>
            <h3>Добавлено вопросов: {questions.length}</h3>
            <ol>
              {questions.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ol>
          </div>
        )}

        <button onClick={this.saveTest}>Сохранить тест</button>
        <button onClick={this.props.onCancel}>Отмена</button>
      </div>
    )
  }
}

CreateTestForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default CreateTestForm
