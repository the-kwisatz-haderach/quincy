import React from 'react'

const Grid: React.FC<{}> = ({ children }) => (
  <div className="grid gap-5 grid-cols-3">{children}</div>
)

export default Grid
