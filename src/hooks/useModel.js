import * as tf from "@tensorflow/tfjs"
import { useState, useEffect } from "react"
import to from "await-to-js"

export default function(
  modelURL = "https://yoyota.gitlab.io/forward-head-posture-model/model.json"
) {
  const [model, setModel] = useState(null)
  useEffect(() => {
    async function loadNet() {
      const [err, m] = await to(tf.loadGraphModel(modelURL))
      if (err) {
        setModel(err)
        return
      }
      setModel({
        async estimate(image) {
          const scores = tf.tidy(() => {
            let pixels = tf.browser.fromPixels(image)
            pixels = tf.image.resizeBilinear(pixels, [224, 224])
            pixels = tf.expandDims(pixels, 0)
            pixels = tf.div(pixels, 255)
            return m.predict(pixels)
          })
          const scoresArray = await scores.array()
          scores.dispose()
          return scoresArray
        }
      })
    }
    loadNet()
  }, [modelURL])
  return model
}
