import { useState } from 'react'
import './App.css'
import { initialTests } from './data'
import TestList from './components/TestList'
import CreateTestForm from './components/CreateTestForm'
import Quiz from './components/Quiz'

function App() {
  const [tests, setTests] = useState(initialTests)
  const [screen, setScreen] = useState('list')
  const [activeTest, setActiveTest] = useState(null)

  function startTest(test) {
    setActiveTest(test)
    setScreen('quiz')
  }

  function saveTest(test) {
    setTests([...tests, test])
    setScreen('list')
  }

  return (
    <div className="app">
      <h1>Онлайн тесты</h1>

      {screen === 'list' && (
        <TestList
          tests={tests}
          onStart={startTest}
          onCreate={() => setScreen('create')}
        />
      )}

      {screen === 'quiz' && (
        <Quiz
          key={activeTest.id}
          test={activeTest}
          onExit={() => setScreen('list')}
        />
      )}

      {screen === 'create' && (
        <CreateTestForm
          onSave={saveTest}
          onCancel={() => setScreen('list')}
        />
      )}
    </div>
  )
}

export default App
