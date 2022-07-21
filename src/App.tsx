import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import ProductAdminPage from './pages/Admin/Product/product'
import CategoriesPage from './pages/Admin/categories'
import AdminLayout from './components/Layout/admin'
import UserLayout from './components/Layout/user'
import HomePage from './pages/Home/home'
import AddProductPage from './pages/Admin/Product/add'
import DetailPage from './pages/Home/Detail'
import SigninPage from './pages/Auth/signin'
import { TypeProducts } from './type/product'
import {getAll, remove, edit} from './api/product'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import UpdateProducts from './pages/Admin/Product/update'

function App(props: any) {
  const [count, setCount] = useState(0)
  const [Products, setProducts] = useState<TypeProducts[]>([])
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAll();
      setProducts(data)
    }
    getProducts();
  }, [])
  const OnRemove=async(id:any)=>{
    try {
      const Confirm = confirm("are you sure to delete ?")
      if(Confirm){
        const {data} = await remove(id)
        setProducts(Products.filter(item=> item.id !== id))
        if(data){
          toast.success("Remove successfully !")
        }
      }

    } catch (error) {
      toast.error("Remove failed !")
    }
  }
  const OnEdit=async(products:TypeProducts)=>{
    try {
      const {data} = await edit(products)
      setProducts(Products.map((item) => item.id == data.id ? data:item))
      if(data){
        toast.success("Edit products succussfully !")
      }

    } catch (error) {
      toast.error(" Edits products failed !")
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/' element={<UserLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='detail' element={<DetailPage/>}/>
        </Route>
        <Route path='admin' element={<AdminLayout/>}>
          <Route index element={<ProductAdminPage products={Products} onRemove={OnRemove}/>}/>
          <Route path='product/add' element={<AddProductPage/>}/>
          <Route path='/admin/product/edit/:id' element={<UpdateProducts onEdit={OnEdit}/>}/>
          <Route path='categories' element={<CategoriesPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
