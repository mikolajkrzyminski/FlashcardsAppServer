const _ = require("lodash");

interface PonsDict {
    key: string;
    simple_label: string;
    directed_label: object;
    languages: string[];
}

interface Dictionary {
    source_lang: string;
    target_lang: string;
}

interface PageData {
    langs: string[];
    labels: object[];
    directed_dicts: Dictionary[];
}

// returns all languages from pons response
function getDictsLangs(ponsDict: PonsDict): any {
    var langsSet = new Set();
    ponsDict.languages.map(
        lang => langsSet.add(lang));
    return langsSet;
}

// returns array of languages and labels
function getLangsLabels(ponsDict: PonsDict): any {
    var langsLabelsSet = new Set();
    const labelsTemp = ponsDict.simple_label.split(" «» ");
    if (ponsDict.languages.length === 2) {
        langsLabelsSet.add({ lang: ponsDict.languages[0], label: labelsTemp[0] });
        langsLabelsSet.add({ lang: ponsDict.languages[1], label: labelsTemp[1] });
    }

    return langsLabelsSet;
}

// returns array of directed dictionaries
function getDicts(ponsDict: PonsDict): Dictionary[] {
    var dictsArray = new Array();
    Object.keys(ponsDict.directed_label).map(
        directedLabel => {
            dictsArray.push({ source_lang: directedLabel.substring(0, 2), target_lang: directedLabel.substring(2, 4) })
        }
    );
    return dictsArray;
}

// returns data used in frontend
function getPageData(serviceData: PonsDict[]): PageData {
    if (!serviceData) {
        return {
            langs: [],
            labels: [],
            directed_dicts: []
        }
    }
    var langsSet = new Set();
    var langsLabelsArray = new Array();
    var resultdictsArray = new Array();

    // iterates over service data
    serviceData.forEach(ponsDict => {
        getDictsLangs(ponsDict).forEach(elem => langsSet.add(elem));
        getLangsLabels(ponsDict).forEach(elem => langsLabelsArray.push(elem));
        getDicts(ponsDict).forEach(elem => resultdictsArray.push(elem));
    });

    var resultlangsLabels: object[] = [];
    // creates unique array of objects with language and label
    resultlangsLabels = _.uniqWith(langsLabelsArray, _.isEqual);
    var pageDate: PageData = {
        langs: Array.from(langsSet, function mapFn(elem) { return String(elem) }) ?? [],
        labels: Array.from(resultlangsLabels) ?? [],
        directed_dicts: resultdictsArray ?? [],
    }
    return pageDate;
}

export default getPageData;
