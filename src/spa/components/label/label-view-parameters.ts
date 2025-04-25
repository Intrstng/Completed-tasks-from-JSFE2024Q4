import type { ElementParameters } from '../../../types';
import { CSS_LOGIN } from '../../view/login/login-classes';
import { loginContent } from '../../../constants/login-constants';

export const nameLabelParameters: ElementParameters = {
    tag: 'label',
    textContent: loginContent.NAME,
    classNames: [CSS_LOGIN.NAME_LABEL],
};

export const passLabelParameters: ElementParameters = {
    tag: 'label',
    textContent: loginContent.PASS,
    classNames: [CSS_LOGIN.PASS_LABEL],
};
