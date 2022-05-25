import { openDB } from "idb";

const initdb = async () =>
  openDB("contacts", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts database already exists");
        return;
      }
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts database created");
    },
  });

export const postDb = async (content) => {
  console.log("Post to the ase");
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.add({ todo: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  console.log("GET all from the database");
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readonly");
  const store = tx.objectStore("contacts");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

export const getOneDb = async (id) => {
  console.log("GET from the database");
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readonly");
  const store = tx.objectStore("contacts");
  const request = store.get(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};
export const deleteDb = async (id) => {
  console.log("DELETE from the database", id);
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

export const putDb = async (id, content) => {
  console.log("PUT to the database");
  const contactsDb = await openDB("contacts", 1);
  const tx = contactsDb.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

initdb();
