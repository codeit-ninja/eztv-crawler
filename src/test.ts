import { getTorrents, getTorrentsByImdbId } from './main'

getTorrentsByImdbId('tt2442560').then(result => console.log(result.imdb_id));