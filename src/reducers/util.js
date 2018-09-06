export const findIndexByKeyValue = (arraytosearch, key, valuetosearch = '') => {
    for (let i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i]['meta'][key] == valuetosearch) {
            return i
        }
    }
    return -1
}
