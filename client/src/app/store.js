import { createContext, useContext } from "react";
import { injectStores } from '@mobx-devtools/tools';
import { configurePersistable } from 'mobx-persist-store';

import { PostStore } from "../modules/posts/post.store";
import { AccountStore } from "../modules/accounts/account.store";


export const store = {
    PostStore: new PostStore(),
    AccountStore: new AccountStore(),
}

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext)
}

injectStores(store);

configurePersistable(
    {
      storage: window.localStorage,
      expireIn: 3600000 * 24 * 30,
      removeOnExpiration: true,
      stringify: false,
      debugMode: true,
    },
    { delay: 200, fireImmediately: false }
);

