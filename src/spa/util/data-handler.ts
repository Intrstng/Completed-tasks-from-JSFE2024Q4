import type { LoadDataCB, SaveToFileData } from '../../types';
import { DataHandlerInput } from '../../types';
import { assertIsDecisionJsonData } from './assertion-functions/assertion-functions';

const FILE_NAME: string = 'option-list.json';

export class DataHandler {
    public fileName: string = FILE_NAME;
    public static saveData(jsonData: SaveToFileData, fileName: string): void {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: DataHandlerInput.ACCEPT });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;

        document.body.append(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        console.log('File successfully saved:', fileName);
    }

    public static loadData(callback: LoadDataCB): void {
        const input = document.createElement('input');
        input.type = DataHandlerInput.TYPE;
        input.accept = DataHandlerInput.ACCEPT;

        input.addEventListener('change', event => {
            if (!(event.target instanceof HTMLInputElement)) {
                console.error('Event target is not an HTMLInputElement.');
                return;
            }

            const { files } = event.target;
            if (!files || files.length === 0) {
                console.error('No file selected or file is invalid.');
                return;
            }

            const file = files.item(0);
            if (!file) {
                console.error('File is undefined.');
                return;
            }

            file.text()
                .then(text => {
                    try {
                        const parsedData: unknown = JSON.parse(text);
                        assertIsDecisionJsonData(parsedData);
                        callback(parsedData);
                    } catch (error) {
                        console.error('Invalid JSON data:', error);
                    }
                })
                .catch(error => {
                    console.error('Error parsing JSON:', error);
                });
        });

        input.click();
    }
}
