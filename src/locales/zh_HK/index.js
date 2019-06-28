import App from './app.json'
import Books from './books.json'
import Film from './film.json'
import Music from './music.json'

const document = {
  ...App,
  ...Books,
  ...Film,
  ...Music,
}

export default document;
