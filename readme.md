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
```json
[
    {
        "id": 271007,
        "title": "$50K Three Ways"
    },
    {
        "id": 449,
        "title": "10 O'Clock Live"
    },
    {
        "id": 189264,
        "title": "10 Puppies and Us"
    },
    {
        "id": 37568,
        "title": "10 Steps to Murder"
    },
    {
        "id": 308,
        "title": "10 Things I Hate About You"
    },
    {
        "id": 74949,
        "title": "10 Years with Hayao Miyazaki"
    }
    ...
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
```json
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
        },
        {
            "showLink": "https://www.tvmaze.com/episodes/4960/game-of-thrones-1x09-baelor",
            "title": "Game of Thrones S01E09 2160p UHD BluRay x265-SCOTLUHD [eztv]",
            "magnet": "magnet:?xt=urn:btih:994ff5674bda5582d4e802dbd320aebf2c2d0642&dn=Game.of.Thrones.S01E09.2160p.UHD.BluRay.x265-SCOTLUHD%5Beztv.io%5D.mkv%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
            "torrent": "https://zoink.ch/torrent/Game.of.Thrones.S01E09.2160p.UHD.BluRay.x265-SCOTLUHD[eztv.io].mkv.torrent",
            "size": 11252814315,
            "released": "1 year",
            "seeds": 0
        },
        {
            "showLink": "https://www.tvmaze.com/episodes/4959/game-of-thrones-1x08-the-pointy-end",
            "title": "Game of Thrones S01E08 2160p UHD BluRay x265-SCOTLUHD [eztv]",
            "magnet": "magnet:?xt=urn:btih:768711c6ab0ed6a22ee4f09e6fadbed1a55e2858&dn=Game.of.Thrones.S01E08.2160p.UHD.BluRay.x265-SCOTLUHD%5Beztv.io%5D.mkv%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969",
            "torrent": "https://zoink.ch/torrent/Game.of.Thrones.S01E08.2160p.UHD.BluRay.x265-SCOTLUHD[eztv.io].mkv.torrent",
            "size": 15171971973,
            "released": "1 year",
            "seeds": 1
        }
        ...
}
```