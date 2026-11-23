import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import QuestionCard from './QuestionCard'

function ChoiceHarness({ onSubmit }) {
  const [value, setValue] = useState('')

  const question = {
    id: 1,
    type: 'choice',
    text: 'Сколько будет 2 + 2?',
    options: ['3', '4'],
    correct: '4'
  }

  return (
    <QuestionCard
      question={question}
      step={0}
      total={2}
      lives={3}
      value={value}
      onChange={setValue}
      onSubmit={onSubmit}
    />
  )
}

function TextHarness({ onSubmit }) {
  const [value, setValue] = useState('')

  const question = {
    id: 2,
    type: 'text',
    text: 'Столица Франции?',
    options: [],
    correct: 'Париж'
  }

  return (
    <QuestionCard
      question={question}
      step={1}
      total={2}
      lives={2}
      value={value}
      onChange={setValue}
      onSubmit={onSubmit}
    />
  )
}

describe('QuestionCard', () => {
  it('показывает прогресс и жизни', () => {
    render(<ChoiceHarness onSubmit={vi.fn()} />)

    expect(screen.getByText('Вопрос 1 из 2 · Жизни: 3')).toBeInTheDocument()
    expect(screen.getByText('Сколько будет 2 + 2?')).toBeInTheDocument()
  })

  it('отправляет выбранный вариант', () => {
    const onSubmit = vi.fn()
    render(<ChoiceHarness onSubmit={onSubmit} />)

    const submit = screen.getByRole('button', { name: 'Ответить' })
    expect(submit).toBeDisabled()

    fireEvent.click(screen.getByRole('radio', { name: '4' }))
    expect(submit).toBeEnabled()

    fireEvent.click(submit)
    expect(onSubmit).toHaveBeenCalledWith('4')
  })

  it('отправляет введённый текст', () => {
    const onSubmit = vi.fn()
    render(<TextHarness onSubmit={onSubmit} />)

    const submit = screen.getByRole('button', { name: 'Ответить' })
    expect(submit).toBeDisabled()

    fireEvent.change(screen.getByPlaceholderText('Ваш ответ'), {
      target: { value: 'Париж' }
    })
    fireEvent.click(submit)

    expect(onSubmit).toHaveBeenCalledWith('Париж')
  })
})
