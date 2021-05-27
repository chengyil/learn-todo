import { forwardRef } from 'react'
import { preventProgratation } from '../../utils'
import { bool, string, func } from 'prop-types'

const InlineTitleInput = forwardRef(({ readOnly, title, handleKeyUp }, ref) => {
  return (
    <>
      {
        readOnly
          ? <label className="form-check-label ml-2 todo-item-title">{title}</label>
          : <input ref={ref} className="form-check-label ml-2 todo-item-title" onClick={preventProgratation} defaultValue={title} onKeyUp={handleKeyUp} />
      }
    </>
  )
})

InlineTitleInput.displayName = 'InlineTitleInput'
InlineTitleInput.propTypes = {
  readOnly: bool,
  title: string,
  handleKeyUp: func
}

export default InlineTitleInput
