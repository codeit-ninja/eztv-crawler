import bytes from "bytes";
import fetch from "cross-fetch";
import { load, CheerioAPI, Element } from 'cheerio';

export type EpisodeType = {
    showLink: string | undefined;
    title: string;
    magnet: string | undefined;
    torrent: string | undefined;
    size: number;
    released: string;
    seeds: number;
}

export type ShowType = {
    title: string;
    summary: string;
    description: string;
    imdbId: string | null;
    episodes: EpisodeType[];
}

export type ImdbEpisodeType = {
    id: number;
    hash: string;
    filename: string;
    episode_url: string;
    torrent_url: string;
    magnet_url: string;
    title: string;
    imdb_id: string;
    season: string;
    episode: string;
    small_screenshot: string;
    large_screenshot: string;
    seeds: number;
    peers: number;
    date_released_unix: number;
    size_bytes: string;
}

export type ApiResponseType = {
    imdb_id?: string;
    torrents_count: number;
    limit: number;
    page: number;
    torrents: ImdbEpisodeType[];
}

/**
 * Crawl any given url
 * 
 * @link https://www.npmjs.com/package/crawler
 * @param url 
 * @returns `Crawler.CrawlerRequestResponse`
 */
export async function crawl(url: string) {
    const body = await fetch(url).then(async resp => resp.text());
    const $ = load(body);

    return { body, $ };
}

/**
 * Get all shows listen on EZTV
 * 
 * @returns `object`
 */
export async function getShows() {
    const { $ } = await crawl(`https://eztv.wf/showlist/`);
    const shows = $('a[class="thread_link"]').toArray();

    return shows.map(show => {
        const showIdRegex = $(show).attr('href')?.match(/shows\/(\d+)\//);

        return {
            id: showIdRegex ? parseInt(showIdRegex[1]) : null,
            title: $(show).text()
        }
    }).filter(show => show.id) as { id: number, title: string }[];
}

/**
 * Get a show and its episodes
 * 
 * Recommended to use an ID, if using a showname
 * it must be an exact match except for uppercase
 * 
 * @param showId    - A show ID or a show name
 * @returns `object`
 */
export async function getShow(show: number|string): Promise<ShowType> {
    /**
     * If a string is passed find show based on title
     */
    if(typeof show === 'string') {
        const shows = await getShows();
        const findShow = shows.find(s => s.title.toLowerCase() === show.toLowerCase());

        if (!findShow) {
            throw new EztvCrawlerException(`Did not find a show with name ${show}`)
        }
        
        return getShow(findShow.id);
    }

    const { $ } = await crawl(`https://eztv.wf/shows/${show}/`);
    const episodes = $('[name="hover"]').toArray();
    const imdbIdRegex = $('[itemprop="aggregateRating"] a').attr('href')?.match(/tt\d+/);
    const result = {
        title: $('.section_post_header [itemprop="name"]').text(),
        summary: $('[itemprop="description"] p').text(),
        description: $('span[itemprop="description"] + br + br + hr + br + span').text(),
        imdbId: imdbIdRegex ? imdbIdRegex[0] : null,
        episodes: episodes.map(episode => {
            return transformToEpisode($, episode);
        })
    }

    if (!result || !result.title || result.title === '') {
        throw new EztvCrawlerException(`Did not find a show with name ${show}`)
    }

    return result;
}

/**
 * Search for a TV show episode
 * 
 * @param query     - string
 * @returns `episodeObject`
 */
export async function search(query: string) {
    const { $ } = await crawl(`https://eztv.wf/search/${query}`);
    const episodes = $('[name="hover"]').toArray();
    
    return episodes.map(episode => {
        return transformToEpisode($, episode);
    })
}

/**
 * Get a list of torrents
 * 
 * @param limit 
 * @param page 
 * @param apiBaseUrl        - If eztv domain changed or eztv is blocked in your country provide a proxy url here
 * @returns `ApiResponseType`
 */
export async function getTorrents(limit = 10, page = 1, apiBaseUrl = 'https://eztv.wf/api/') {
    return await makeApiRequest('/get-torrents', { limit: limit.toString(), page: page.toString() }, apiBaseUrl);
}

/**
 * Get a list of torrents based on IMDb ID
 * 
 * NOTE:     
 * For TV Shows provide the IMDb id of the show itself, it does not work
 * when you provide an IMDb for individual episodes
 * 
 * @param imdbId            - IMDb ID
 * @param apiBaseUrl        - If eztv domain changed or eztv is blocked in your country provide a proxy url here
 * @returns `ApiResponseType`
 */
export async function getTorrentsByImdbId(imdbId: string, apiBaseUrl = 'https://eztv.wf/api/') {
    return await makeApiRequest('/get-torrents', { imdb_id: imdbId }, apiBaseUrl);
}

/**
 * Send a request to EZTV's API
 * 
 * @param path      
 * @param params 
 * @param apiBaseUrl 
 * @returns `ApiResponseType`
 */
async function makeApiRequest(path: string, params: Record<string, string>, apiBaseUrl = 'https://eztv.wf/api/') {
    if (params.imdb_id) {
        params.imdb_id = params.imdb_id.replace(/\D+/, '');
    }

    try {
        const request = await fetch(`${apiBaseUrl}/${path}?${new URLSearchParams(params)}`);
        const json: ApiResponseType = await request.json();

        return json;
    } catch(e) {
        if(e instanceof Error) {
            throw new EztvCrawlerException(e.message);
        }

        throw new EztvCrawlerException('Could not fullfill request.');
    }
}

/**
 * Transforms a <table> Element into a episode object
 * 
 * Note: in torrents, don't parse the `.download_2` class, it contains spam and malware in some cases
 * 
 * @param $         - cheerio.CheerioAPI
 * @param episode   - cheerio.Element
 * @returns `episodeObject`
 */
function transformToEpisode($: CheerioAPI, episode: Element) {
    return {
        showLink: $(episode).find('td:nth-child(1) a').attr('href'),
        title: $(episode).find('td:nth-child(2)').text()?.replace(/\n/g, ''),
        magnet: $(episode).find('td:nth-child(3) .magnet').attr('href')?.replace(/\n/g, ''),
        torrent: $(episode).find('td:nth-child(3) .download_1').attr('href')?.replace(/\n/g, ''),
        size: bytes($(episode).find('td:nth-child(4)').text()),
        released: $(episode).find('td:nth-child(5)').text(),
        seeds: parseInt($(episode).find('td:nth-child(6)').text()) || 0
    }
}

export class EztvCrawlerException extends Error {}