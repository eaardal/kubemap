class Store {
  static setStore(store) {
    Store._store = store;
  }

  static getStore() {
    return Store._store;
  }

  static dispatch(action) {
    return Store._store.dispatch(action);
  }
}

export default Store;
