import Storage from '../storage';
import data1 from './data-1';



export const loadData = () => {
    const models = Storage.getAllFromStorage();

    if (models.length === 0) {
        Storage.saveToStorage(data1);
    }

    return Storage.getAllFromStorage();
};

