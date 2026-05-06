import { useRef, useEffect } from "react"

export default function useEstimationLoop({
  net,
  image,
  ctx,
  width,
  height,
  frameRate,
  onEstimate,
  onError
}) {
  const onEstimateRef = useRef()
  onEstimateRef.current = onEstimate

  useEffect(() => {
    if (!net || !image || !ctx) return () => {}
    if (net instanceof Error || image instanceof Error) return () => {}

    let intervalId
    let requestId
    function cleanUp() {
      clearInterval(intervalId)
      cancelAnimationFrame(requestId)
    }

    async function estimate() {
      try {
        ctx.scale(-1, 1)
        ctx.drawImage(image, 0, 0, width * -1, height)
        const score = await net.estimate(image)
        onEstimateRef.current(score)
      } catch (err) {
        cleanUp()
        onError(err.message)
      }
    }

    if (frameRate) {
      intervalId = setInterval(estimate, Math.round(1000 / frameRate))
      return cleanUp
    }

    function animate() {
      estimate()
      requestId = requestAnimationFrame(animate)
    }
    requestId = requestAnimationFrame(animate)

    return cleanUp
  }, [ctx, frameRate, height, image, net, width])
}
