
interface PonsDict {
    key: string;
    simple_label: string;
    directed_label: object;
    languages: string[]
}

// get all languages from pons response
function getDictsLangs(serviceData: PonsDict[]): string[] {
    if (!serviceData) return [];
    var langsSet = new Set();
    serviceData.map(
        langArray => langArray.languages.map(
            lang => langsSet.add(lang)));
    return Array.from(langsSet, function mapFn(elem) { return String(elem) });
}

function getLangsLabels(serviceData: PonsDict[]): any[] {
    var langsLabelsSet = new Set();
    serviceData.map(ponsDict => {
        const labelsTemp = ponsDict.simple_label.split(" «» ");
        for (let i = 0; i < ponsDict.languages.length; i++) {
            langsLabelsSet.add({ [ponsDict.languages[i]]: labelsTemp[i] });
        }
    });
    return Array.from(langsLabelsSet);
}

export { getDictsLangs, getLangsLabels };
