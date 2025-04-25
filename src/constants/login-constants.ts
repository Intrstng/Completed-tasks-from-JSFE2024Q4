import type { LoginContent } from '../spa/view/login/types';

export const loginContent: LoginContent = {
    TITLE: 'Authorization',
    NAME: 'Name',
    PASS: 'Password',
    INPUT_NAME_ID: 'inputName',
    INPUT_PASS_ID: 'inputPassword',
    ERROR_NAME: 'The name must be at least 3 characters long, begin with and contain only one capital letter.',
    ERROR_PASS:
        'The password must contain one lowercase letter, one uppercase letter, one digit and be at least 8 characters long.',
    AUTOCOMPLETE_VALUE: 'new-password',
};
