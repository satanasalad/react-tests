import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Quiz from './Quiz'

const test = {
  id: 1,
  title: 'Мини-тест',
  questions: [
    {
      id: 1,
      type: 'choice',
      text: 'Сколько будет 2 + 2?',
      options: ['3', '4'],
      correct: '4'
    },
    {
      id: 2,
      type: 'text',
      text: 'Столица Франции?',
      options: [],
      correct: 'Париж'
    }
  ]
}

const threeQuestions = {
  id: 2,
  title: 'Три вопроса',
  questions: [
    { id: 1, type: 'truefalse', text: 'Вопрос 1', options: ['Правда', 'Ложь'], correct: 'Правда' },
    { id: 2, type: 'truefalse', text: 'Вопрос 2', options: ['Правда', 'Ложь'], correct: 'Правда' },
    { id: 3, type: 'truefalse', text: 'Вопрос 3', options: ['Правда', 'Ложь'], correct: 'Правда' }
  ]
}

describe('Quiz', () => {
  it('проходит тест и показывает результат', async () => {
    render(<Quiz test={test} onExit={vi.fn()} />)

    fireEvent.click(screen.getByRole('radio', { name: '4' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ответить' }))

    expect(screen.getByText('Вопрос 2 из 2 · Жизни: 3')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Ваш ответ'), {
      target: { value: 'Париж' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ответить' }))

    expect(await screen.findByText('2 из 2 (100%)')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Пройти снова' }))
    expect(screen.getByText('Вопрос 1 из 2 · Жизни: 3')).toBeInTheDocument()
  })

  it('заканчивает тест после трёх ошибок', async () => {
    const onExit = vi.fn()
    render(<Quiz test={threeQuestions} onExit={onExit} />)

    for (let i = 0; i < 3; i += 1) {
      fireEvent.click(screen.getByRole('radio', { name: 'Ложь' }))
      fireEvent.click(screen.getByRole('button', { name: 'Ответить' }))
    }

    expect(await screen.findByText('0 из 3 (0%)')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'К списку тестов' }))
    expect(onExit).toHaveBeenCalledTimes(1)
  })
})
