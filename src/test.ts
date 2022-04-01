import { getTorrents, getTorrentsByImdbId } from './main'

getTorrentsByImdbId('tt2442560', 100).then(result => console.log(result.limit));