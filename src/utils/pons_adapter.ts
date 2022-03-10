import { getDictArray } from "../communication/communication";

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

// returns all languages from pons response
function getDictsLangs(serviceData: PonsDict[]): string[] {
    if (!serviceData) return [];
    var langsSet = new Set();
    serviceData.map(langArray => langArray.languages.map(
        lang => langsSet.add(lang)));
    return Array.from(langsSet, function mapFn(elem) { return String(elem) });
}

// returns array of languages and labels
function getLangsLabels(serviceData: PonsDict[]): any[] {
    if (!serviceData) return [];
    var langsLabelsSet = new Set();
    serviceData.map(ponsDict => {
        const labelsTemp = ponsDict.simple_label.split(" «» ");
        for (let i = 0; i < ponsDict.languages.length; i++) {
            langsLabelsSet.add({ [ponsDict.languages[i]]: labelsTemp[i] });
        }
    });
    return Array.from(langsLabelsSet);
}

// returns array of directed dictionaries
function getDicts(serviceData: PonsDict[]): Dictionary[] {
    if (!serviceData) return [];
    var dictsArray = new Array();
    serviceData.map(ponsDict => Object.keys(ponsDict.directed_label).map(
        directedLabel => {
            dictsArray.push({ source_lang: directedLabel.substring(0, 2), target_lang: directedLabel.substring(2, 4) })
        }
    ));
    return dictsArray;
}

export { getDictsLangs, getLangsLabels, getDicts };
