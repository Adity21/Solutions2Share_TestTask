import React, { useState } from 'react'

const NestedList = () => {
  const [data, setData] = useState([
    {
      title: 'Item 1',
      children: [
        {
          title: 'Nested Item 1',
          children: [],
        },
      ],
    },
    {
      title: 'Item 2',
      children: [],
    },
  ])

  const addData = (item: any, newData: any) => {
    if (item.children) {
      item.children.push(newData)
    } else {
      item.children = [newData]
    }
    setData([...data])
  }

  const renderNestedList = (items: any) => (
    <ul>
      {items.map((item: any, index: number) => (
        <li key={index}>
          {item.title}
          {item.children && renderNestedList(item.children)}

          <button
            onClick={() => addData(item, { title: `New Item ${index + 1}` })}
          >
            Add Child
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <div>
      <h1>Nested List Example</h1>
      {renderNestedList(data)}
    </div>
  )
}

export default NestedList
