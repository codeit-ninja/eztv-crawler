import { getTorrents, getTorrentsByImdbId } from './main'

getTorrents(10, 5).then(result => console.log(result.page));