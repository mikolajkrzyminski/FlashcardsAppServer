import 'dotenv/config'
const axios = require('axios').default;

import getPageData from '../utils/pons_adapter';

interface PageData {
    langs: string[];
    labels: object;
    directed_dicts: object[];
}

// supported languages of service response
const languages = ['de', 'el', 'en', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'sl', 'tr', 'zh'];

// urls
const urlGetDicts = "https://api.pons.com/v1/dictionaries";

const urlGetTrans = "https://api.pons.com/v1/dictionary";

// returns list of supported languages 
function getLanguages(): string[] {
    return languages;
}

// returns all dictionaries available in service
async function getDictsData(lang?: string): Promise<any> {
    var resultObject;
    // get request to external service
    try {
        const response = await axios.get(urlGetDicts, {
            params: {
                // checks if given language is supported (is in languages array)
                language: languages.includes(lang as string) ? lang : languages[2]
            }
        });
        const serviceData = response.data;
        resultObject = getPageData(serviceData);
    } catch (error) {
        resultObject = [];
    }
    return resultObject;
}

// returns translation of search phrase
async function getTranslation(searchPhrase: string, sourceLang: string, targetLang: string): Promise<any> {
    var resultArray: any[] = [];
    try {
        let config = {
            headers: {
                'X-Secret': process.env.SECRET_PONS_KEY
            },
            params: {
                q: searchPhrase,
                l: getDictName(sourceLang, targetLang),
                in: sourceLang,
            }
        };
        const response = await axios.get(urlGetTrans, config);
        response.data[0].hits[0].roms[0].arabs[0].translations.forEach(element => {
            resultArray.push({
                source: RemoveHTMLTags(element.source),
                target: RemoveHTMLTags(element.target),
            });
        });
    } catch (error) {
        resultArray = [];
    }
    return resultArray;
}

// returns concatenation in alphabetical order
function getDictName(first: string, second: string): string {
    return first < second ? first + second : second + first
}

// regex for removing hmtl tags from response
function RemoveHTMLTags(html) {
    var regX = /(<([^>]+)>)/ig;
    return html.replace(regX, "");
}

export { getLanguages, getDictsData, getTranslation };
