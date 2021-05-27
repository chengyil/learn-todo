import { memo, useState, useCallback, useRef, useContext } from 'react'
import { TrashFill, CheckLg } from '../Icon'
import { UNDONE, DONE, DELETE, SAVE } from './useTodoListState'
import { bool, object, string, func } from 'prop-types'
import InlineTitleInput from './InlineTitleInput'
import { DateFormatContext, DateOnly } from '../../context/DateFormatContext'

const TodoItem = memo(({ id, completed, todoDate, title, dispatch }) => {
  const dateFormatContext = useContext(DateFormatContext)
  const [readOnly, setReadOnly] = useState(true)
  const inputRef = useRef()
  const onCheckChange = () => {
    completed
      ? dispatch({ type: UNDONE, payload: { id, completed: !completed } })
      : dispatch({ type: DONE, payload: { id, completed: !completed } })
  }

  const onDelete = () => {
    dispatch({ type: DELETE, payload: { id } })
  }

  const save = () => {
    setReadOnly(true)
    dispatch({ type: SAVE, payload: { id, title: inputRef.current.value } })
  }

  const onSave = (e) => {
    e.stopPropagation()
    save()
  }

  const onKeyUp = useCallback((e) => {
    switch (e.key) {
      case 'Enter': {
        save()
        break
      }
      case 'Escape': {
        setReadOnly(true)
        break
      }
    }
  })

  const handleOnClick = (e) => {
    if (readOnly) {
      setReadOnly(false)
    } else {
      onSave(e)
    }
  }

  return (
    <li className="list-group-item todo-item" onClick={handleOnClick}>
      <div className="d-flex justify-content-between align-item-center" >
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-start align-items-center ">
            <input className="form-check-input todo-item-check" type="checkbox" checked={completed} onChange={onCheckChange}/>
            <InlineTitleInput ref={inputRef} readOnly={readOnly} title={title} handleKeyUp={onKeyUp} />
          </div>
          <div>
            <small className="text-center">{
              dateFormatContext.dateFormat === DateOnly
                ? todoDate.toLocaleDateString()
                : todoDate.toISOString()
            }
            </small>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-end mb-1">
              <svg className="bi" width="32" height="32" fill="currentColor">
                <use xlinkHref="bootstrap-icons.svg#heart-fill" />
              </svg>
              {
                !readOnly && <button className="btn-primary btn btn-sm" onClick={onSave}><CheckLg /></button>
              }
              <button className="btn-warning btn btn-sm" onClick={onDelete}><TrashFill /> </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
})

TodoItem.propTypes = {
  id: string,
  completed: bool,
  todoDate: object,
  title: string,
  dispatch: func
}

TodoItem.displayName = 'TodoItem'

export default TodoItem
