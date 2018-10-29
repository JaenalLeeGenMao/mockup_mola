import Dexie from 'dexie';

const db = new Dexie('mola-search-cache-database');
db.version(1).stores({ searchKeyword: '++id, keyword, createdDate' });
db.version(1).stores({ moviesResult: '++id, movieId, createdDate' });
db.version(1).stores({ castsResult: '++id, castId, createdDate' });

export default db;
