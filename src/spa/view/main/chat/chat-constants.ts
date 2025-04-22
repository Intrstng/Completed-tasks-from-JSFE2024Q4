import { ContactItem, MessageItem } from '../../../../types';

export const chatContent: { [key: string]: string } = {
  SEARCH: 'Search...',
  INPUT_SEARCH_ID: 'inputSearch',
  ONLINE: 'online',
  OFFLINE: 'offline',
  MESSAGE: 'Type your message...',
  NO_CONTACT: 'No contact selected',
  BLANK_MESSAGE: 'Select the user you want to send a message to...',
  AUTHOR: 'You',
  DELIVERED: 'message delivered',
  READ: 'message read',
  EDITED: 'message edited',
};

export const mockContacts: ContactItem[] = [
  { login: "Alice", isLogined: true },
  { login: "Bob", isLogined: false },
  { login: "Charlie", isLogined: true },
  { login: "David", isLogined: true },
  { login: "Eva", isLogined: false },
  { login: "Frank", isLogined: true },
  { login: "Grace", isLogined: false },
  { login: "Hannah", isLogined: false },
  { login: "Ian", isLogined: false },
  { login: "Jack", isLogined: false },
  { login: "Smith", isLogined: false },
  { login: "Johnson", isLogined: false },
  { login: "Williams", isLogined: false },
  { login: "Jones", isLogined: false },
  { login: "Brown", isLogined: false },
  { login: "Davis", isLogined: false },
  { login: "Miller", isLogined: false },
  { login: "Wilson", isLogined: false },
  { login: "Moore", isLogined: false },
  { login: "Taylor", isLogined: false },
  { login: "Bob", isLogined: false },
  { login: "Charlie", isLogined: true },
  { login: "David", isLogined: true },
  { login: "Eva", isLogined: false },
  { login: "Frank", isLogined: true },
  { login: "Grace", isLogined: false },
  { login: "Hannah", isLogined: false },
  { login: "Ian", isLogined: false },
  { login: "Jack", isLogined: false },
  { login: "Smith", isLogined: false },
  { login: "Johnson", isLogined: false },
  { login: "Williams", isLogined: false },
  { login: "Jones", isLogined: false },
  { login: "Brown", isLogined: false },
  { login: "Davis", isLogined: false },
  { login: "Miller", isLogined: false },
  { login: "Wilson", isLogined: false },
  { login: "Moore", isLogined: false },
  { login: "Taylor", isLogined: false },
];

export const mockMessages: MessageItem[] = [
  {
    id: '2',
    from: 'Sender 2',
    to: '',
    text: 'Text 2',
    datetime: 22222,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: true,
    }
  },
  {
    id: '4',
    from: '',
    to: 'Reciever 4',
    text: 'Text 4',
    datetime: 44444,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: false,
    }
  },
  {
    id: '5',
    from: 'Sender 5',
    to: '',
    text: 'Text 5',
    datetime: 55555,
    status: {
      isDelivered: true,
      isReaded: false,
      isEdited: false,
    }
  },
  {
    id: '7',
    from: 'Sender 7',
    to: '',
    text: 'Text 7',
    datetime: 77777,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: true,
    }
  },
  {
    id: '8',
    from: '',
    to: 'Reciever 8',
    text: 'Text 8',
    datetime: 88888,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: false,
    }
  },
  {
    id: '11',
    from: 'Sender 11',
    to: '',
    text: 'Text 11',
    datetime: 1111111111,
    status: {
      isDelivered: true,
      isReaded: false,
      isEdited: false,
    }
  },
  {
    id: '1',
    from: 'Sender 1',
    to: '',
    text: 'Text 1',
    datetime: 11111,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: true,
    }
  },
  {
    id: '3',
    from: '',
    to: 'Reciever 3',
    text: 'Text 3',
    datetime: 33333,
    status: {
      isDelivered: true,
      isReaded: true,
      isEdited: false,
    }
  },
  {
    id: '15',
    from: 'Sender 15',
    to: '',
    text: 'Text 15 The "WebSockets" module is crafted to provide an in-depth exploration of using WebSockets within the context of frontend web development. This module covers the essentials of WebSocket technology, its advantages over traditional HTTP communication, and how to implement WebSockets in a JavaScript environment. It aims to equip students with the skills needed to create real-time, bi-directional communication applications, such as chat applications, live notifications, and more.The "WebSockets" module is crafted to provide an in-depth exploration of using WebSockets within the context of frontend web development. This module covers the essentials of WebSocket technology, its advantages over traditional HTTP communication, and how to implement WebSockets in a JavaScript environment. It aims to equip students with the skills needed to create real-time, bi-directional communication applications, such as chat applications, live notifications, and more.The "WebSockets" module is crafted to provide an in-depth exploration of using WebSockets within the context of frontend web development. This module covers the essentials of WebSocket technology, its advantages over traditional HTTP communication, and how to implement WebSockets in a JavaScript environment. It aims to equip students with the skills needed to create real-time, bi-directional communication applications, such as chat applications, live notifications, and more.The "WebSockets" module is crafted to provide an in-depth exploration of using WebSockets within the context of frontend web development. This module covers the essentials of WebSocket technology, its advantages over traditional HTTP communication, and how to implement WebSockets in a JavaScript environment. It aims to equip students with the skills needed to create real-time, bi-directional communication applications, such as chat applications, live notifications, and more.',
    datetime: 1515151515,
    status: {
      isDelivered: true,
      isReaded: false,
      isEdited: false,
    }
  }
]