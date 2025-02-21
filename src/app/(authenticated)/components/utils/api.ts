const base_url:string = "http://127.0.0.1:8000/api/"
import axios from "@/lib/axios";

export const fetch_books = async (url: string) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};


export const fetch_comments = async (urlparm:string) => { 
    const subbase = "comment?"
    const url = base_url + subbase + urlparm;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data;

    } catch (error) { 
        console.log(error);
    }
}

export const _delete_book_ = async (urlparam: string) => { 
    const subbase: string = "book"; 
    const url = base_url + subbase + urlparam; 
    try {
        const response = await fetch(url, {
            method: 'delete',
        });
        console.log(response)

    } catch (err) { 
        console.log(err);
    }
}

export const _delete_comment_ = async (urlparm: string) => {
    const subbase = "comment";
    const url = base_url + subbase + urlparm;
    try {
        const response = await fetch(url, {
            method:'delete',
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) { 
        console.log(error)
    }
}
 
export const _type_ = async (id: number) => {
    const subbase = "types"
    const url = base_url + subbase + `?id=${id}`
    try {
        const response = await fetch(url)
        console.log(response)
        return response
    } catch (error) { 
        console.log(error)
    }
 }