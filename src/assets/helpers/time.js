const getDate = (timePost) => {
  const sec = (timePost / 1000).toFixed(0)
  const min = (timePost / (1000 * 60)).toFixed(0)
  const hrs = (timePost / (1000 * 60 * 60)).toFixed(0)
  const days = (timePost / (1000 * 60 * 60 * 24)).toFixed(0)
  const weeks = (timePost / (1000 * 60 * 60 * 24 * 7)).toFixed(0)
  const months = (timePost / (1000 * 60 * 60 * 24 * 31)).toFixed(0)
  const years = (timePost / (1000 * 60 * 60 * 24 * 12)).toFixed(0)

  if (sec < 60) {
    return sec + ' seconds ago'
  } else if (min < 60) {
    return min + ' mins ago'
  } else if (hrs < 24) {
    return hrs + ' hrs ago'
  } else if (days < 7) {
    return days + ' days ago'
  } else if (weeks < 4) {
    return weeks + ' weeks ago'
  } else if (months < 12) {
    return months + ' months ago'
  } else {
    return years + ' year ago'
  }
}

export default getDate
