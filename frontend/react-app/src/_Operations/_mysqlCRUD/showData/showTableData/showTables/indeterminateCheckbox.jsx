import React from 'react'

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <React.StrictMode>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </React.StrictMode>
    )
  }
)


