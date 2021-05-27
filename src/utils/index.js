import { v4 } from 'uuid'

export function createTodo (title, completed = false) {
  const todoDate = new Date()
  const id = v4()
  return { id, title, todoDate, completed }
}

export const preventProgratation = (e) => {
  e.stopPropagation()
}
