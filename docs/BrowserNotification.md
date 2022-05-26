```jsx
import React, { useState, useEffect, useCallback } from "react"
import ForwardHeadPosture from "react-forward-head-posture"
// import ForwardHeadPosture from "../src/components/ForwardHeadPosture"

const q = []

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission()
  }
}

function notify(message) {
  const n = new Notification(message)
  setTimeout(() => {
    n.close()
  }, 2000)
}

function BrowserNotification() {
  const [score, setScore] = useState(0)
  const [threshold, setThreshold] = useState(
    localStorage.getItem("threshold") || 20
  )
  const [avgScore, setAvgScore] = useState(0)

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  const handleChange = useCallback(
    e => {
      const { value } = e.target
      setThreshold(value)
      localStorage.setItem("threshold", value)
    },
    [setThreshold]
  )

  useEffect(() => {
    if (q.length > 9) {
      q.shift()
    }

    q.push(score)
    const average = q.reduce((prev, curr) => prev + curr, 0) / q.length
    setAvgScore(Math.round(average))

    if (avgScore < threshold) {
      notify(avgScore)
    }
  }, [score, avgScore, threshold])
  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Alert threshold</label>
        <div className="col-sm-10">
          <input type="number" value={threshold} onChange={handleChange} />
        </div>
      </div>
      <h1 className={score < 0 ? "text-danger" : ""}>
        score: {Math.round(avgScore)}
      </h1>
      <ForwardHeadPosture
        style={{ width: "100%" }}
        onEstimate={setScore}
        frameRate={4}
      />
    </>
  )
}


;<>
  <BrowserNotification />
</>
```
