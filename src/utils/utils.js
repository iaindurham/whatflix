const sortAlphabetically = movies =>
  movies.sort(({ movie_title: titleA }, { movie_title: titleB }) => {
    const titleAUppercase = titleA.toUpperCase() // ignore upper and lowercase
    const titleBUppercase = titleB.toUpperCase() // ignore upper and lowercase
    if (titleAUppercase < titleBUppercase) {
      return -1
    }
    if (titleAUppercase > titleBUppercase) {
      return 1
    }
    return 0
  })

const mapNames = movies => movies.map(movie => movie.movie_title)

const top3 = movies => movies.slice(0, 3)

module.exports = {
  sortAlphabetically,
  mapNames,
  top3
}
