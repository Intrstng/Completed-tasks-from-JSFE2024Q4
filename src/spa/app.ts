import '../style.scss';
import State from '../state/state';

const ACCESS_KEY_TO_RECORD_IN_LS = 'decisionMakingTool';

export default class App {
    constructor() {}

    createView() {}

    createRoutes(state) {
        return [];
    }

    setContent(page, view) {
        this.header.setSelectedItem(page);
        this.main.setContent(view);
    }
}
