export class DataLoader {
    constructor(path) {
        this.link = path;
    }

    getDataByLink = async () => {
        try {
            const res = await fetch(this.link);
            console.log(this.link)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return await res.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
}