import 'dotenv/config'
const axios = require('axios').default;

const languages = ['de', 'el', 'en', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'sl', 'tr', 'zh'];

const urlGetDicts = "https://api.pons.com/v1/dictionaries";

const urlGetTrans = "https://api.pons.com/v1/dictionary";

function getLanguages(): string[] {
    return languages;
}

async function getDictArray(lang?: string): Promise<any> {
    var resultArray;
    try {
        const response = await axios.get(urlGetDicts, {
            params: {
                language: lang
            }
        });
        resultArray = response.data;
    } catch (error) {
        resultArray = [];
    }
    return resultArray;

}

async function getTranslation(searchPhrase: string, dictionary: string, sourceLang: string): Promise<any> {
    var resultArray: any[] = [];
    try {
        let config = {
            headers: {
                'X-Secret': process.env.SECRET_PONS_KEY
            },
            params: {
                q: searchPhrase,
                l: dictionary,
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

function RemoveHTMLTags(html) {
    var regX = /(<([^>]+)>)/ig;
    return html.replace(regX, "");
}

export { getLanguages, getDictArray, getTranslation };
