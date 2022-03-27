### EZTV API - for NodeJS

A promised based node module to scrape TV shows, episodes and torrent info from EZTV.

Module was created because popular existing modules dont support TypeScript, are overkill and EZTV's official API sucks.

## Examples

#### getShows
Usage
```typescript
import { getShows } from 'eztv-scraper'

const shows = await getShows();
```
Response
```javascript
[
    {
        "id": 271007,
        "title": "$50K Three Ways"
    }
    // ...
]
```
#### getShow
Usage
```typescript
import { getShow } from 'eztv-scraper'

const show = await getShow(481);   // By ID (481 = Game of Thrones)
//const show = await getShow('Game of thrones'); // or by name
```
Response
```javascript
{
    "title": "Game of Thrones",
    "summary": "Based on the bestselling book series A Song of Ice and Fire by George R.R. Martin, this sprawling new HBO drama is set in a world where summers span decades and winters can last a lifetime. From the scheming south and the savage eastern lands, to the frozen north and ancient Wall that protects the realm from the mysterious darkness beyond, the powerful families of the Seven Kingdoms are locked in a battle for the Iron Throne. This is a story of duplicity and treachery, nobility and honor, conquest and triumph. In the Game of Thrones, you either win or you die.",
    "description": "In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea. —Sam Gray",
    "imdbId": "tt0944947",
    "episodes": [
        {
            "showLink": "https://www.tvmaze.com/episodes/4961/game-of-thrones-1x10-fire-and-blood",
            "title": "Game of Thrones S01E10 2160p UHD BluRay x265-SCOTLUHD [eztv]",
            "magnet": "magnet:?xt=urn:btih:a017ac9bf02de9e36f1f9177bdb60612186b0b0d&dn=Game.of.Thrones.S01E10.2160p.UHD.BluRay.x265-SCOTLUHD%5Beztv.io%5D.mkv%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
            "torrent": "https://zoink.ch/torrent/Game.of.Thrones.S01E10.2160p.UHD.BluRay.x265-SCOTLUHD[eztv.io].mkv.torrent",
            "size": 10383083438,    // bytes
            "released": "1 year",
            "seeds": 0
        }
        // ...
}
```

#### search
Usage
```typescript
import { search } from 'eztv-scraper'

const result = await search('game of thrones s01e01');
```
Response
```javascript
[
    {
        "showLink": "/shows/481/game-of-thrones/",
        "title": "Game of Thrones S01E01 2160p UHD BluRay x265-SCOTLUHD [eztv]",
        "magnet": "magnet:?xt=urn:btih:e4aae367b822794d37d8cafd5a628db985d65fb4&dn=Game.of.Thrones.S01E01.2160p.UHD.BluRay.x265-SCOTLUHD%5Beztv.io%5D.mkv%5Beztv.re%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
        "torrent": "https://zoink.ch/torrent/Game.of.Thrones.S01E01.2160p.UHD.BluRay.x265-SCOTLUHD[eztv.io].mkv.torrent",
        "size": 12605729013,
        "released": "1 year",
        "seeds": 3
    }
    // ...
]
```