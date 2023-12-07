import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

class TrieNode {
  public child;
  public end;

  constructor(child = {}, end = false) {
    this.child = child;
    this.end = end;
  }
}

class Trie {
  private root;
  constructor() {
    this.root = new TrieNode();
  }
  insert(word: string) {
    let current: { child: any; end: boolean } = this.root;

    for (const char of word) {
      if (!current.child[char]) {
        current.child[char] = new TrieNode();
      }
      current = current.child[char];
    }

    current.end = true;
  }

  search(word: string) {
    let current: { child: any; end: boolean } = this.root;

    for (const char of word) {
      if (current.child[char]) {
        current = current.child[char];
      } else {
        return false;
      }
    }

    return current.end;
  }

  startsWith(prefix: string) {
    let current: { child: any; end: boolean } = this.root;

    for (const char of prefix) {
      if (current.child[char]) {
        current = current.child[char];
      } else {
        return false;
      }
    }

    return true;
  }
}

export const bTrieSlice = createSlice({
  name: 'bTrie',
  initialState: { trie: new Trie(), startTerm: [], searchTerms: false },
  reducers: {
    bTrieAdded(state, action) {
      const brTieArr = action.payload;
      for (const val of brTieArr) {
        state.trie.insert(val);
      }
    },
    bTrieSearch(state, action) {
      const str = action.payload;
      state.searchTerms = state.trie.search(str);
    },
    bTrieStartsWith(state, action) {
      state;
    }
  }
});

export const { bTrieAdded, bTrieSearch } = bTrieSlice.actions;
export const selectBTrie = (state: any) => state.bTrie;

export default bTrieSlice.reducer;
