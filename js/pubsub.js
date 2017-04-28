const events = (() => {
  const topics = {}
  const on = (topic, action) => {
    if (!topics.hasOwnProperty(topic)) topics[topic] = []
    const index = topics[topic].push(action) - 1
    const remove = () =>
      topics[topic][index] = null
    return { remove }
  }
  const publish = (topic, data) => {
    if (!topics.hasOwnProperty(topic)) return false
    return topics[topic].reduce((result, action) => {
      if (action) result.push(action(data))
      return result
    }, [])
  }
  return {
    on,
    publish
  }
})()