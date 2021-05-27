import { useMemo, useState } from 'react'
import TodoItem from './TodoItem'
import TitleInput from './TitleInput'
import TodoSummary from './TodoSummary'
import useTodoItemsState from './useTodoListState'
import { DateFormatContextProvider, useDateFormatContext, DateOnly, ISO8061 } from '../../context/DateFormatContext'

const Todo = () => {
  const [todoItems, dispatch] = useTodoItemsState()
  const [dateFormatContext, setDateFormatContext] = useDateFormatContext()
  const [titleFilter, setTitleFilter] = useState('')

  const onFilterChange = (e) => {
    setTitleFilter(e.target.value)
  }

  const [pending, completed] = useMemo(() =>
    Object.values(todoItems).reduce(([pending, completed], item) => {
      if (titleFilter && item.title.includes(titleFilter)) {
        item.completed ? completed.push(item) : pending.push(item)
      } else if (!titleFilter) {
        item.completed ? completed.push(item) : pending.push(item)
      }
      return [pending, completed]
    }, [[], []]), [todoItems, titleFilter])

  const onFormatChange = (e) => {
    setDateFormatContext(e.target.value)
  }

  return (
    <div className="container w-50">
      <DateFormatContextProvider value={dateFormatContext}>
        <div className="row mb-2">
          <div className="col-9">
            <h1>Todo</h1>
          </div>
          <div className="col-3 align-self-center">
            <select className="form-select" aria-label="Date Format" onChange={onFormatChange}>
              <option value={DateOnly}>dd/mm/yyyy</option>
              <option value={ISO8061}>ISO8061 datetime</option>
            </select>
          </div>
        </div>
        <div className="row mb-4 justify-content-between">
          <div className="col-5">
            <TitleInput dispatch={dispatch} />
          </div>
          <div className="col-5">
            <input type="text" className="form-control" placeholder="Filter" onChange={onFilterChange} />
          </div>
        </div>
        <div className="row">
          <TodoSummary todoItems={todoItems} />
        </div>
        <div className="row pb-4">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="font-weight-bold">To Be Done</span>
              <span className="badge badge-primary">{pending.length}</span>
            </li>
            {pending.map((item) => {
              return <TodoItem dispatch={dispatch} key={item.id} {...item} />
            })}
          </ul>
        </div>
        <div className="row">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span className="font-weight-bold">Completed</span>
              <span className="badge badge-primary">{completed.length}</span>
            </li>
            {completed.map((item) => {
              return <TodoItem dispatch={dispatch} key={item.id} {...item} />
            })}
          </ul>
        </div>
      </DateFormatContextProvider>
    </div>
  )
}

Todo.displayName = 'todo'

export default Todo
