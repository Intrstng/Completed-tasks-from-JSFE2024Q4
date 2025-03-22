import type { JsonData, LoadDataCB } from '../../types';
import { DataHandlerInput } from '../../types';
import { assertIsDecisionJsonData } from './assertion-functions/assertion-functions';

export class DataHandler {
    public fileName: string = 'option-list.json';
    public static saveData(jsonData: JsonData, fileName: string): void {
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
            if (event.target instanceof HTMLInputElement) {
                const target = event.target;
                if (target.files && target.files.length > 0) {
                    const file = target.files.item(0);
                    if (file) {
                        file.text()
                            .then(text => {
                                const parsedData: unknown = JSON.parse(text);
                                try {
                                    assertIsDecisionJsonData(parsedData);
                                    callback(parsedData);
                                } catch (error) {
                                    console.error('Invalid JSON data:', error);
                                }
                            })
                            .catch(error => {
                                console.error('Error parsing JSON:', error);
                            });
                    } else {
                        console.error('File is undefined.');
                    }
                } else {
                    console.error('No file selected or file is invalid.');
                }
            } else {
                console.error('Event target is not an HTMLInputElement.');
            }
        });

        input.click();
    }
}
