import { atom } from 'recoil';

export const listId = atom({
  key: 'listId',
  default: null,
});
export const tasksIndex = atom({
  key: 'tasksIndex',
  default: null,
});
export const taskName = atom({
  key: 'taskName',
  default: null,
});
export const listName = atom({
  key: 'listName',
  default: null,
});
export const newIndex = atom({
  key: 'newIndex',
  default: null,
});

export const listsState = atom({
  key: 'listsState',
  default: [],
});

export const newListNameState = atom({
  key: 'newListNameState',
  default: '',
});

export const showAddListState = atom({
  key: 'showAddListState',
  default: false,
});

export const newTaskNameState = atom({
  key: 'newTaskNameState',
  default: '',
});

export const addingTaskIndexState = atom({
  key: 'addingTaskIndexState',
  default: null,
});


export const cardDataState = atom({
  key: 'cardDataState',
  default: {
    taskName: '',
    description: '',
  },
});
