import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hero heading', () => {
  render(<App />);
  const heading = screen.getByText(/JavaScript с нуля/i);
  expect(heading).toBeInTheDocument();
});

test('renders all eight example sections', () => {
  render(<App />);
  const titles = [
    'Переменные',
    'Функции',
    'Условные операторы',
    'Циклы',
    'DOM',
    'Обработка событий',
    'Формы',
    'Анимации',
  ];
  titles.forEach((title) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
