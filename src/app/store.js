import { createContext, useContext } from "react";
import { injectStores } from '@mobx-devtools/tools';

import { PostStore } from "../modules/posts/post.store";


export const store = {
    PostStore: new PostStore(),
}

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext)
}

injectStores(store);
