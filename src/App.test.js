import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
/* eslint-disable */
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Welcome to RideOn/i)
  expect(linkElement).toBeInTheDocument()
})
