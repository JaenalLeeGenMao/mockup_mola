import Dexie from 'dexie';

const db = new Dexie('mola-search-cache-database');
db.version(1).stores({ searchKeyword: '++id, keyword' });
db.version(1).stores({ moviesResult: '++id, movieId' });
Dexie.debug = true;
export default db;