import { AboutContent } from './types';
import { COLORS } from '../../../constants/constants';

export const aboutContent: AboutContent = {
    TITLE: 'Fun chat',
    DESCRIPTION_TITLE: 'The application functions as a client for a chat service utilizing WebSocket technology. It allows users to:',
    DESCRIPTION_LIST: ['Send messages', 'View chat history', 'Edit and delete messages'],
    DESCRIPTION_ADD: 'Additionally, it\'s important to note that the chat service requires a separate local server to operate. This server is responsible for managing chat features, storing messages, and handling user management functions.',
    LINK_COLOR: COLORS.link,
    NAME: 'Intrstng',
    VIEWBOX: '0 0 26 26'
};
