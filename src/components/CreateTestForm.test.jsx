import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CreateTestForm from './CreateTestForm'

describe('CreateTestForm', () => {
  it('показывает ошибки валидации', () => {
    render(<CreateTestForm onSave={vi.fn()} onCancel={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить тест' }))
    expect(screen.getByText('Введите название теста')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Название теста'), {
      target: { value: 'Новый тест' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Сохранить тест' }))
    expect(screen.getByText('Добавьте хотя бы один вопрос')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Добавить вопрос' }))
    expect(screen.getByText('Введите текст вопроса')).toBeInTheDocument()
  })

  it('добавляет вопрос и сохраняет тест', () => {
    const onSave = vi.fn()
    const { container } = render(
      <CreateTestForm onSave={onSave} onCancel={vi.fn()} />
    )

    fireEvent.change(screen.getByPlaceholderText('Название теста'), {
      target: { value: 'Мой тест' }
    })
    fireEvent.change(screen.getByPlaceholderText('Текст вопроса'), {
      target: { value: 'Каким свойством задают цвет текста?' }
    })
    fireEvent.change(screen.getByPlaceholderText('Вариант 1'), {
      target: { value: 'color' }
    })
    fireEvent.change(screen.getByPlaceholderText('Вариант 2'), {
      target: { value: 'background' }
    })
    fireEvent.change(container.querySelector('select[name="correct"]'), {
      target: { value: 'color' }
    })

    fireEvent.click(screen.getByRole('button', { name: 'Добавить вопрос' }))
    expect(screen.getByText('Добавлено вопросов: 1')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Сохранить тест' }))

    expect(onSave).toHaveBeenCalledTimes(1)
    const saved = onSave.mock.calls[0][0]

    expect(saved.title).toBe('Мой тест')
    expect(saved.questions).toHaveLength(1)
    expect(saved.questions[0]).toMatchObject({
      type: 'choice',
      text: 'Каким свойством задают цвет текста?',
      options: ['color', 'background'],
      correct: 'color'
    })
  })

  it('вызывает onCancel', () => {
    const onCancel = vi.fn()
    render(<CreateTestForm onSave={vi.fn()} onCancel={onCancel} />)

    fireEvent.click(screen.getByRole('button', { name: 'Отмена' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
