import { useState } from 'react'

// Намеренное нарушение правил хуков для демонстрации упавшего CI
export default function LintDemo({ enabled }) {
  if (enabled) {
    const [value] = useState(0)
    return <div>{value}</div>
  }

  return null
}
