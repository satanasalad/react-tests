import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('показывает список и открывает форму создания теста', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Онлайн тесты' })).toBeInTheDocument()
    expect(screen.getByText('Основы React')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Создать тест' }))
    expect(screen.getByText('Новый тест')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Отмена' }))
    expect(screen.getByText('Основы React')).toBeInTheDocument()
  })
})
