import { AppState } from '../../types';

function parseInputToObject(input: string): AppState {
    const lines = input.trim().split('\n');

    const { list, lastId } = lines.reduce<AppState>(
        (acc, line) => {
            const [title, weight] = line.split(',').map(item => item.trim());

            if (title && weight) {
                acc.lastId += 1;
                acc.list.push({
                    id: `#${acc.lastId}`,
                    title,
                    weight,
                });
            }

            return acc;
        },
        { list: [], lastId: 0 }
    );

    return { list, lastId };
}

// // Example input
// const input = `
// title,1
// title with whitespace,2
// title , with , commas,3
// title with &quot;quotes&quot;,4
// `;
//
// // Parse the input
// const result = parseInputToObject(input);
// console.log(result);
