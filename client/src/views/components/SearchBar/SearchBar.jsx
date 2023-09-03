import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from "@uidotdev/usehooks";
import { Box, FormControl, Input } from '@chakra-ui/react';

import { useStore } from '../../../app/store';
import cl from "./SearchBar.module.scss";


export const SearchBar = ({ onChange }) => {
  const { PostStore } = useStore();

  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get('search');

  const [searchQuery, setSearchQuery] = useState(searchQueryParam || "");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, [searchQueryParam])

  useEffect(() => {
    PostStore.setSearchQuery(debouncedSearchQuery);
    window.scrollTo(0, 0);
  }, [debouncedSearchQuery, PostStore])

  return (
      <Box className={cl.searchBar} width={"100%"}>
        <FormControl>
          <Input
            type='text'
            className={cl.input}
            placeholder={"Искать посты"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        </FormControl>
      </Box>
  )
}
