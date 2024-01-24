//usersListResponse
export interface UsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UsersListResItem[];
  support: Support;
}

export interface UsersListResItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

//userResponse
export interface UserResponse {
  data: Data;
  support: Support;
}

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}
