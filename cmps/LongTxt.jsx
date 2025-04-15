const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayText = isExpanded ? txt : txt.slice(0, length)

  return (
    <div>
      <p>{displayText}</p>
      <button onClick={() => setIsExpanded((prev) => !prev)}>
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  )
}
