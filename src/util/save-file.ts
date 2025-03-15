import { JsonData, LoadDataCB } from '../types';

export class FileSaver {
    public saveData(jsonData: JsonData, fileName: string): void {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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
                        reader.onload = e => {
                            const result = e.target;
                            if (result && typeof result.result === 'string') {
                                try {
                                    const jsonData: JsonData = JSON.parse(result.result);
                                    callback(jsonData);
                                } catch (error) {
                                    console.error('Error parsing JSON:', error);
                                }
                            }
                        };
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

// const fileSaver = new FileSaver();
//
// const data: JsonData = {
//   list: [
//     { id: "#1", title: "rertert", weight: "32" },
//     { id: "#3", title: "7777", weight: "7" }
//   ],
//   lastId: 3
// };
// fileSaver.saveData(data, 'data.json');

// fileSaver.loadData((data: JsonData) => {
//   console.log('Loaded data:', data);
// })
