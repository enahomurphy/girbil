export interface SearchResult {
  id: string;
  name: string;
  avatar: string;
  type: string;
  conversation_id: string;
  members: number;
  isPrivate: boolean;
  is_member: boolean;
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
