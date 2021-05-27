import { memo, useState, useEffect, createRef } from 'react'
import { object } from 'prop-types'

function getPendingCount (todoItems) {
  return Object.values(todoItems).reduce((pendingCount, todo) => todo.completed ? pendingCount : pendingCount + 1, 0)
}

const TodoSummary = memo(({ todoItems }) => {
  const count = getPendingCount(todoItems)
  const [summary, setSummary] = useState()
  const summaryRef = createRef()
  useEffect(() => {
    if (count) {
      setSummary(`You still have ${count} more todo to complete!`)
    } else {
      setSummary('Congrats, you have completed your todo. Sit back and relax.')
    }
  })
  return (
    <div ref={summaryRef} className={`alert ${count ? 'alert-warning' : 'alert-success'}`} role="alert">
      {summary}
    </div>
  )
}, ({ todoItems: previous }, { todoItems: next }) => {
  return getPendingCount(previous) === getPendingCount(next)
})

TodoSummary.displayName = 'TodoSummary'
TodoSummary.propTypes = {
  todoItems: object

}

export default TodoSummary
