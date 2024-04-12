import { openDB } from 'idb';

// Create database
const initdb = async () =>
	openDB('jate', 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains('jate')) {
				console.log('jate database already exists');
				return;
			}
			db.createObjectStore('jate', {
				keyPath: 'id',
				autoIncrement: true,
			});
			console.log('jate database created');
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { 
  console.log('content', content);
  

  const jateDb = await openDB('jate', 1); 
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ content });
  const result = await request;
  console.log('result.value', request, result); 
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (e) => {
  console.log('GET from the database');


 const jateDb = await openDB('jate', 1); 
 const tx = jateDb.transaction('jate', "readonly" ); 

 const store = tx.objectStore('jate'); 
 const request = store.get(1); 

 const result = await request;
 console.log('result.value1', result, result?.value);
 return result?.value;

}
initdb();
