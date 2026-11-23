export const initialTests = [
  {
    id: 1,
    title: 'Основы React',
    questions: [
      {
        id: 1,
        type: 'choice',
        text: 'Что возвращает хук useState?',
        options: [
          'Значение состояния и функцию для его изменения',
          'Только объект состояния',
          'Ссылку на DOM-элемент'
        ],
        correct: 'Значение состояния и функцию для его изменения'
      },
      {
        id: 2,
        type: 'truefalse',
        text: 'useEffect может выполняться после каждого рендера компонента',
        options: ['Правда', 'Ложь'],
        correct: 'Правда'
      },
      {
        id: 3,
        type: 'text',
        text: 'Каким хуком создают ссылку на DOM-элемент?',
        options: [],
        correct: 'useRef'
      },
      {
        id: 4,
        type: 'choice',
        text: 'Как называются данные, которые передаются в компонент снаружи?',
        options: ['props', 'state', 'ref'],
        correct: 'props'
      },
      {
        id: 5,
        type: 'truefalse',
        text: 'Состояние можно менять напрямую, например state = 5',
        options: ['Правда', 'Ложь'],
        correct: 'Ложь'
      }
    ]
  },
  {
    id: 2,
    title: 'JavaScript для React',
    questions: [
      {
        id: 1,
        type: 'choice',
        text: 'Что делает метод map у массива?',
        options: [
          'Создает новый массив по результатам функции',
          'Меняет исходный массив',
          'Удаляет элементы из массива'
        ],
        correct: 'Создает новый массив по результатам функции'
      },
      {
        id: 2,
        type: 'truefalse',
        text: 'const запрещает изменять значение переменной',
        options: ['Правда', 'Ложь'],
        correct: 'Правда'
      },
      {
        id: 3,
        type: 'text',
        text: 'Какой оператор используют для строгого сравнения?',
        options: [],
        correct: '==='
      }
    ]
  }
]
