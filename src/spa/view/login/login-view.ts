import './login.scss';
import View from '../view';
import SessionStorageState from '../../state/session-storage-state';
import Router from '../../router/router';
import { loginParameters, loginTitleParameters } from './login-view-parameters';
import CreatorElement from '../../util/creator-element';

export default class LoginView extends View {
  public router: Router;
  private readonly state: SessionStorageState;


  constructor(state: SessionStorageState, router: Router) {
    super(loginParameters);

    this.configureView();
  }

  private configureView(): void {
    const title = new CreatorElement(loginTitleParameters)
    this.viewElementCreator.addInnerElement(title)
  }
}

