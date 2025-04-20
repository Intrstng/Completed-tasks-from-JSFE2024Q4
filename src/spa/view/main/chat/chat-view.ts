import './chat.scss';
import View from '../../view';
import type Router from '../../../router/router';
import CreatorElement from '../../../util/creator-element';
import type LocalStorageState from '../../../state/session-storage-state';
import InputFieldCreator from '../../../util/input-field/input-field-creator';
import CreatorDialog from '../../../util/dialog/dialog-creator';
import { dialogContentParameters, dialogParameters } from '../../../util/dialog/dialog-view-parameters';
import { chatSectionParameters } from './parameters/chat-view-parameters';

export default class ChatView extends View {
    public router: Router;
    private readonly state: LocalStorageState;
    private garageQuantity: CreatorElement | null;
    private readonly garagePage: CreatorElement | null;
    private raceBoard: CreatorElement | null;
    private finish: CreatorElement | null;
    private inputCreateNameField: InputFieldCreator | null;
    private inputCreateColorField: InputFieldCreator | null;
    private inputUpdateNameField: InputFieldCreator | null;
    private inputUpdateColorField: InputFieldCreator | null;
    private carCreateLogo: SVGElement | null;
    private carUpdateLogo: SVGElement | null;
    private prevButton: CreatorElement | null;
    private nextButton: CreatorElement | null;
    private readonly dialog: CreatorDialog | null;

    constructor(state: LocalStorageState, router: Router) {
        super(chatSectionParameters);
        this.garageQuantity = null;
        this.garagePage = null;
        this.raceBoard = null;
        this.finish = null;
        this.inputCreateNameField = null;
        this.inputCreateColorField = null;
        this.inputUpdateNameField = null;
        this.inputUpdateColorField = null;
        this.carCreateLogo = null;
        this.carUpdateLogo = null;
        this.prevButton = null;
        this.nextButton = null;
        this.router = router;
        this.state = state;

        this.dialog = new CreatorDialog(dialogParameters, dialogContentParameters);



        this.configureView();
    }

    public addDialog(): void {
        if (this.dialog instanceof CreatorDialog) {
            const dialogElement: HTMLElement | null = this.dialog.getElement();
            if (dialogElement) {
                this.viewElementCreator.addInnerElement(dialogElement);
            }
        }
    }

    private async configureView(): Promise<void> {
        // const title  = new CreatorElement(garageCurrentParameters)
        // this.viewElementCreator.addInnerElement(title)

        //this.addDialog();
    }

}
