import { memo } from 'react'
import { NEW_TODO } from './useTodoListState'
import PropTypes from 'prop-types'

const TitleInput = memo(({ dispatch }) => {
  const onInputTaskChange = (e) => {
    if (e.type !== 'keyup') return
    switch (e.key) {
      case 'Enter': {
        dispatch({
          type: NEW_TODO,
          payload: {
            title: e.target.value,
            todoDate: new Date()
          }
        })
        e.target.value = ''
        break
      }
      case 'Escape': {
        e.target.value = ''
        break
      }
    }
  }

  return (
    <input type="text"
      onKeyUp={onInputTaskChange}
      onChange={onInputTaskChange}
      className="form-control"
        placeholder="What do you want to do?"
      />
  )
})

TitleInput.displayName = 'TitleInput'

TitleInput.propTypes = {
  dispatch: PropTypes.func
}

export default TitleInput
