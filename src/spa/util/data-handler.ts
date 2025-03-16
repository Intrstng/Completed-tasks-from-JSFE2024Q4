import type { JsonData, LoadDataCB } from '../../types';

export class DataHandler {
    public fileName: string = 'option-list.json';
    public saveData(jsonData: JsonData, fileName: string): void {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
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

    public loadData(callback: LoadDataCB): void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.addEventListener('change', event => {
            if (event.target instanceof HTMLInputElement) {
                const target = event.target;
                if (target.files && target.files.length > 0) {
                    const file = target.files.item(0);
                    if (file) {
                        const reader = new FileReader();
                        reader.addEventListener('load', event => {
                            const result = event.target;
                            if (result && typeof result.result === 'string') {
                                try {
                                    const jsonData: JsonData = JSON.parse(result.result);
                                    callback(jsonData);
                                } catch (error) {
                                    console.error('Error parsing JSON:', error);
                                }
                            }
                        });
                        reader.readAsText(file);
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
