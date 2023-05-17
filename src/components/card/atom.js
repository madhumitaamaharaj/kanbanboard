import { atom } from 'recoil';

export const listid = atom({
  key: 'listid',
  default: null,
});
export const tasksIndex = atom({
  key: 'tasksIndex',
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