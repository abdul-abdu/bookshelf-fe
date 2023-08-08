interface IBookData {
  book: IBook;
  status: number;
}

interface IBook {
  author: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: number;
  title: string;
}

interface IBookApiResponse {
  data: IBookData[];
  isOk: boolean;
  message: string;
}
