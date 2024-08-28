export default class Post {
  constructor(
    private _id: string,
    private _owner: string,
    private _content: string
  ) {}

  get id(): string {
    return this._id;
  }

  get owner(): string {
    return this._owner;
  }


  get content(): string {
    return this._content;
  }
} 