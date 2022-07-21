import instance from "./instance";
import { TypeProducts } from "../type/product";


export const getAll = () => {
    const url = "/products"
    return instance.get(url)
}

export const create = (data:any) => {
    const url = "/products"
    return instance.post(url, data)
}
export const remove = (id:number) =>{
    const url = `/products/${id}`
    return instance.delete(url)
}
export const read =(id:any)=>{
    const url= `/products/${id}`
    return instance.get(url)
}
export const edit =(products:TypeProducts)=>{
    const url= `/products/${products.id}`
    return instance.put(url,products)
}