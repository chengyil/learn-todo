import { createTodo } from '../../utils'
import { useReducer } from 'react'

export const NEW_TODO = 'newTodo'
export const UNDONE = 'undone'
export const DONE = 'done'
export const DELETE = 'delete'
export const SAVE = 'save'

const dispatcher = (state, { type, payload }) => {
  switch (type) {
    case NEW_TODO: {
      const newItem = createTodo(payload.title)
      return { ...state, [newItem.id]: newItem }
    }
    case UNDONE:
    case DONE: {
      const { [payload.id]: current, ...others } = state
      const updatedTodo = { ...current, completed: payload.completed }
      return { ...others, [payload.id]: updatedTodo }
    }
    case DELETE: {
      const { [payload.id]: current, ...newState } = state
      return newState
    }
    case SAVE: {
      return { ...state, [payload.id]: { ...state[payload.id], title: payload.title } }
    }
    default:
      return state
  }
}

const useTodoItemsState = () => {
  const [todoItems, dispatch] = useReducer(
    dispatcher,
    [],
    () => {
      return [
        createTodo('Learn React'),
        createTodo('Buy Milk'),
        createTodo('Smile'),
        createTodo('Laugh', true)
      ].reduce((map, item) => {
        map[item.id] = item
        return map
      }, {})
    }
  )

  return [todoItems, dispatch]
}

export default useTodoItemsState
