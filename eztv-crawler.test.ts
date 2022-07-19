import { getShow, search, getShows, getTorrents, getTorrentsByImdbId } from './src/main';

// ['title', 'summary', 'description', 'imdbId', 'episodes']

test('Get single show from eztv', async () => {
    const result = await getShow(481);

    expect(result).toEqual(expect.objectContaining({
        title: expect.any(String),
        summary: expect.any(String),
        description: expect.any(String),
        imdbId: expect.any(String),
        episodes: expect.any(Array),
    }));
})

test('Search for a show on eztv', async () => {
    const result = await search('game of thrones s01e01');
    
    expect(result[0]).toEqual(expect.objectContaining({
        showLink: expect.any(String),
        title: expect.any(String),
        magnet: expect.any(String),
        torrent: expect.any(String),
        size: expect.any(Number),
        released: expect.any(String),
        seeds: expect.any(Number),
    }))
})

test('Get list of shows', async () => {
    const result = await getShows();
    
    expect(result[0]).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
    }))
})

test('Get list of torrents', async () => {
    const result = await getTorrents();
    
    expect(result).toEqual(expect.objectContaining({
        torrents_count: expect.any(Number),
        limit: expect.any(Number),
        page: expect.any(Number),
        torrents: expect.any(Array)
    }))
})

test('Get list of torrents by IMDb ID', async () => {
    const result = await getTorrentsByImdbId('tt6048596');
    
    expect(result).toEqual(expect.objectContaining({
        imdb_id: expect.anything(),
        torrents_count: expect.any(Number),
        limit: expect.any(Number),
        page: expect.any(Number),
        torrents: expect.any(Array)
    }))
})