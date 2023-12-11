import { createSlice } from '@reduxjs/toolkit';

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
  findWordsWithPrefix(prefix: string) {
    let current: { child: any; end: boolean } = this.root;
    for (let char of prefix) {
      if (!current.child[char]) {
        return [];
      }
      current = current.child[char];
    }
    return this._findWords(current, prefix);
  }

  _findWords(node: { child: any; end: boolean }, prefix: string): string[] {
    let results = [];
    if (node.end) {
      results.push(prefix);
    }
    for (let char in node.child) {
      results = results.concat(
        this._findWords(node.child[char], prefix + char)
      );
    }
    return results;
  }
}

export const bTrieSlice = createSlice({
  name: 'bTrie',
  initialState: { trie: new Trie(), startTerm: [], searchTerms: false },
  reducers: {
    bTrieAdded(state, action) {
      const brTieArr = action.payload;

      if (brTieArr)
        for (const val of brTieArr) {
          state.trie.insert(val);
        }
    },
    bTrieSearch(state, action) {
      const str = action.payload;
      state.searchTerms = state.trie.search(str);
    },
    bTrieFindWords(state, action) {
      const str: string = action.payload;
      console.log(str);
      if (str.length) state.startTerm = state.trie.findWordsWithPrefix(str);
    }
  }
});

export const { bTrieAdded, bTrieSearch, bTrieFindWords } = bTrieSlice.actions;
export const selectBTrie = (state: any) => state.bTrie;

export default bTrieSlice.reducer;
