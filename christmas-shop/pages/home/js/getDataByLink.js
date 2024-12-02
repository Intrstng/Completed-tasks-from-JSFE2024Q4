export const getDataByLink = async (link) => {
    try {
        const res = await fetch(link);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}