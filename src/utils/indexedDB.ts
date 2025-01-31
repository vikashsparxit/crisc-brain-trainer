import { Question } from '../types/quiz';

interface Progress {
  id?: number;
  currentQuestionIndex: number;
  score: number;
  answers: boolean[];
  streak: number;  // Added streak to the interface
}

export const initDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
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

export const saveQuestions = async (questions: Question[]): Promise<boolean> => {
  const db = await initDB();
  const tx = db.transaction('questions', 'readwrite');
  const store = tx.objectStore('questions');
  
  questions.forEach(question => {
    store.put(question);
  });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getQuestions = async (): Promise<Question[]> => {
  const db = await initDB();
  const tx = db.transaction('questions', 'readonly');
  const store = tx.objectStore('questions');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveProgress = async (progress: Omit<Progress, 'id'>): Promise<boolean> => {
  const db = await initDB();
  const tx = db.transaction('progress', 'readwrite');
  const store = tx.objectStore('progress');
  store.put({ id: 1, ...progress });

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
};

export const getProgress = async (): Promise<Progress | null> => {
  const db = await initDB();
  const tx = db.transaction('progress', 'readonly');
  const store = tx.objectStore('progress');
  const request = store.get(1);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};