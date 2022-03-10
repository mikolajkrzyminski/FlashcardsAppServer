
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

export { getDictsLangs };
