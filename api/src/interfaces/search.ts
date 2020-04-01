export interface SearchResult {
  id: string;
  name: string;
  avatar: string;
  type: string;
  conversationId: string;
  members: number;
  isPrivate: boolean;
  isMember: boolean;
  isOwner: boolean;
}

export interface ParsedText {
  searchType: string;
  searchText: string;
}

interface QueryParam {
  query: string
  params: string[]
}

export interface QueryMap {
  channel: QueryParam,
  user: QueryParam,
  all: QueryParam
}
