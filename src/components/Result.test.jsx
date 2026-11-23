import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Result from './Result'

describe('Result', () => {
  it('считает и показывает процент', () => {
    render(
      <Result
        testTitle="Основы React"
        score={3}
        total={4}
        onRetry={vi.fn()}
        onExit={vi.fn()}
      />
    )

    expect(screen.getByText('Основы React')).toBeInTheDocument()
    expect(screen.getByText('3 из 4 (75%)')).toBeInTheDocument()
  })

  it('вызывает onRetry и onExit', () => {
    const onRetry = vi.fn()
    const onExit = vi.fn()

    render(
      <Result
        testTitle="Тест"
        score={1}
        total={2}
        onRetry={onRetry}
        onExit={onExit}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Пройти снова' }))
    fireEvent.click(screen.getByRole('button', { name: 'К списку тестов' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
    expect(onExit).toHaveBeenCalledTimes(1)
  })
})
