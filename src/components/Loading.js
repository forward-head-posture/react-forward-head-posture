import React from "react"

function Loading({ name, target }) {
  if (!target) {
    return <p>{`loading ${name} ...`}</p>
  }
  if (target instanceof Error) {
    return (
      <>
        <p>{`There was an error while loading ${name}`}</p>
        <font color="red">{target.message}</font>
      </>
    )
  }
  return <></>
}

export default Loading
