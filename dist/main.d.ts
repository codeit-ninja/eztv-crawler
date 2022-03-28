import Crawler from "crawler";
export declare type EpisodeType = {
    showLink: string | undefined;
    title: string;
    magnet: string | undefined;
    torrent: string | undefined;
    size: number;
    released: string;
    seeds: number;
};
export declare type ShowType = {
    title: string;
    summary: string;
    description: string;
    imdbId: string | null;
    episodes: EpisodeType[];
};
/**
 * Crawl any given url
 *
 * @link https://www.npmjs.com/package/crawler
 * @param url
 * @returns `Crawler.CrawlerRequestResponse`
 */
export declare function crawl(url: string): Promise<Crawler.CrawlerRequestResponse>;
/**
 * Get all shows listen on EZTV
 *
 * @returns `object`
 */
export declare function getShows(): Promise<{
    id: number;
    title: string;
}[]>;
/**
 * Get a show and its episodes
 *
 * Recommended to use an ID, if using a showname
 * it must be an exact match except for uppercase
 *
 * @param showId    - A show ID or a show name
 * @returns `object`
 */
export declare function getShow(show: number | string): Promise<ShowType>;
/**
 * Search for a TV show episode
 *
 * @param query     - string
 * @returns `episodeObject`
 */
export declare function search(query: string): Promise<{
    showLink: string | undefined;
    title: string;
    magnet: string | undefined;
    torrent: string | undefined;
    size: number;
    released: string;
    seeds: number;
}[]>;
export declare class EztvCrawlerException extends Error {
}
