export const initDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CRISCQuizDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('questions')) {
        db.createObjectStore('questions', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'id' });
      }
    };
  });
};

export const saveQuestions = async (questions: any[]) => {
  const db = await initDB();
  const tx = (db as IDBDatabase).transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  
  questions.forEach(question => {
    store.put(question);
  });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getQuestions = async () => {
  const db = await initDB();
  const tx = (db as IDBDatabase).transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveProgress = async (progress: any) => {
  const db = await initDB();
  const tx = (db as IDBDatabase).transaction('progress', 'readwrite');
  const store = tx.objectStore('progress');
  store.put({ id: 1, ...progress });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getProgress = async () => {
  const db = await initDB();
  const tx = (db as IDBDatabase).transaction('progress', 'readonly');
  const store = tx.objectStore('progress');
  const request = store.get(1);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};