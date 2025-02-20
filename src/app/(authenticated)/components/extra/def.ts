export interface data {
    current_page:number ,
    data:book[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url:string,
    next_page_url:string,
    path:string,
    per_page: number,
    prev_page_url: null | string,
    to: number,
    total:number

}
export interface comment_data {
    current_page:number ,
    data:commentype[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url:string,
    next_page_url:string,
    path:string,
    per_page: number,
    prev_page_url: null | string,
    to: number,
    total:number

 }
export interface book { 
    id: number, 
    title: string
    cover_path: string | null,
    description: string | null,
    published_year:number,
    isbn: string,
    comments:boolean,
    created_at: string, 
    updated_at:string , 
    pages:number,
    current_page_number:number,
    authors: author[]
    types:type[]
}
export interface author {
    id: number,
    name: string,
    pivot:book_author ,
}
 
export interface type {
    id: number,
    name: string,
    pivot:book_type ,
}
export interface book_author { 
    book_id: number,
    author_id:number
}
export interface book_type { 
    book_id: number,
    type_id:number
}

export interface commentype { 
    id: number,
    book_id :number,
    comment: string,
}
export interface type_icon {[key:string]:JSX.Element }