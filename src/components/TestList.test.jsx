import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import TestList from './TestList'

const tests = [
  {
    id: 1,
    title: 'Основы React',
    questions: [
      { id: 1, type: 'text', text: 'Вопрос 1', options: [], correct: 'a' },
      { id: 2, type: 'text', text: 'Вопрос 2', options: [], correct: 'b' }
    ]
  },
  {
    id: 2,
    title: 'JavaScript',
    questions: [
      { id: 1, type: 'text', text: 'Вопрос 1', options: [], correct: 'a' }
    ]
  }
]

describe('TestList', () => {
  it('показывает тесты и количество вопросов', () => {
    render(<TestList tests={tests} onStart={vi.fn()} onCreate={vi.fn()} />)

    expect(screen.getByText('Основы React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Вопросов: 3')).toBeInTheDocument()
    expect(screen.getByText('Вопросов: 1')).toBeInTheDocument()
  })

  it('передаёт выбранный тест в onStart', () => {
    const onStart = vi.fn()
    render(<TestList tests={tests} onStart={onStart} onCreate={vi.fn()} />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Пройти' })[1])

    expect(onStart).toHaveBeenCalledWith(tests[1])
  })

  it('вызывает onCreate', () => {
    const onCreate = vi.fn()
    render(<TestList tests={tests} onStart={vi.fn()} onCreate={onCreate} />)

    fireEvent.click(screen.getByRole('button', { name: 'Создать тест' }))

    expect(onCreate).toHaveBeenCalledTimes(1)
  })
})
