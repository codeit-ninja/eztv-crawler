"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EztvCrawlerException = exports.search = exports.getShow = exports.getShows = exports.crawl = void 0;
const crawler_1 = __importDefault(require("crawler"));
const bytes_1 = __importDefault(require("bytes"));
/**
 * Crawl any given url
 *
 * @link https://www.npmjs.com/package/crawler
 * @param url
 * @returns `Crawler.CrawlerRequestResponse`
 */
function crawl(url) {
    return new Promise(resolve => {
        new crawler_1.default({
            maxConnections: 5,
            retries: 2,
            callback(error, res, done) {
                if (error) {
                    throw new EztvCrawlerException(error.message, error);
                }
                done();
                resolve(res);
            }
        })
            .queue(url);
    });
}
exports.crawl = crawl;
/**
 * Get all shows listen on EZTV
 *
 * @returns `object`
 */
function getShows() {
    return __awaiter(this, void 0, void 0, function* () {
        const { $ } = yield crawl(`https://eztv.wf/showlist/`);
        const shows = $('a[class="thread_link"]').toArray();
        return shows.map(show => {
            var _a;
            const showIdRegex = (_a = $(show).attr('href')) === null || _a === void 0 ? void 0 : _a.match(/shows\/(\d+)\//);
            return {
                id: showIdRegex ? parseInt(showIdRegex[1]) : null,
                title: $(show).text()
            };
        }).filter(show => show.id);
    });
}
exports.getShows = getShows;
/**
 * Get a show and its episodes
 *
 * Recommended to use an ID, if using a showname
 * it must be an exact match except for uppercase
 *
 * @param showId    - A show ID or a show name
 * @returns `object`
 */
function getShow(show) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * If a string is passed find show based on title
         */
        if (typeof show === 'string') {
            const shows = yield getShows();
            const findShow = shows.find(s => s.title.toLowerCase() === show.toLowerCase());
            if (!findShow) {
                throw new EztvCrawlerException(`Did not find a show with name ${show}`);
            }
            return getShow(findShow.id);
        }
        const { $ } = yield crawl(`https://eztv.wf/shows/${show}/`);
        const episodes = $('[name="hover"]').toArray();
        const imdbIdRegex = (_a = $('[itemprop="aggregateRating"] a').attr('href')) === null || _a === void 0 ? void 0 : _a.match(/tt\d+/);
        const result = {
            title: $('.section_post_header [itemprop="name"]').text(),
            summary: $('[itemprop="description"] p').text(),
            description: $('span[itemprop="description"] + br + br + hr + br + span').text(),
            imdbId: imdbIdRegex ? imdbIdRegex[0] : null,
            episodes: episodes.map(episode => {
                return transformToEpisode($, episode);
            })
        };
        if (!result || !result.title || result.title === '') {
            throw new EztvCrawlerException(`Did not find a show with name ${show}`);
        }
        return result;
    });
}
exports.getShow = getShow;
/**
 * Search for a TV show episode
 *
 * @param query     - string
 * @returns `episodeObject`
 */
function search(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const { $ } = yield crawl(`https://eztv.wf/search/${query}`);
        const episodes = $('[name="hover"]').toArray();
        return episodes.map(episode => {
            return transformToEpisode($, episode);
        });
    });
}
exports.search = search;
/**
 * Transforms a <table> Element into a episode object
 *
 * Note: in torrents, don't parse the `.download_2` class, it contains spam and malware in some cases
 *
 * @param $         - cheerio.CheerioAPI
 * @param episode   - cheerio.Element
 * @returns `episodeObject`
 */
function transformToEpisode($, episode) {
    var _a, _b, _c;
    return {
        showLink: $(episode).find('td:nth-child(1) a').attr('href'),
        title: (_a = $(episode).find('td:nth-child(2)').text()) === null || _a === void 0 ? void 0 : _a.replaceAll(/\n/g, ''),
        magnet: (_b = $(episode).find('td:nth-child(3) .magnet').attr('href')) === null || _b === void 0 ? void 0 : _b.replaceAll(/\n/g, ''),
        torrent: (_c = $(episode).find('td:nth-child(3) .download_1').attr('href')) === null || _c === void 0 ? void 0 : _c.replaceAll(/\n/g, ''),
        size: (0, bytes_1.default)($(episode).find('td:nth-child(4)').text()),
        released: $(episode).find('td:nth-child(5)').text(),
        seeds: parseInt($(episode).find('td:nth-child(6)').text()) || 0
    };
}
class EztvCrawlerException extends Error {
}
exports.EztvCrawlerException = EztvCrawlerException;
//# sourceMappingURL=main.js.map