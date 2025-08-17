import React, { useEffect, useState } from 'react'
import MyContext  from './myContext'
import { addDoc, collection, onSnapshot, orderBy, query, QuerySnapshot, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { fireDB } from '../../firebase/FirebaseConfig'

const myState = (props) => {

    const [mode, setMode] = useState('light')

    const toggleMode=()=>{
        if(mode === 'light'){
            setMode('dark')
            document.body.style.backgroundColor='rgb(17, 24, 39'
        }
        else{
            setMode('light')
            document.body.style.backgroundColor='white'
        }
    }
    
    const [loading, setLoading] = useState(false)

    const [products,setProducts] = useState({
        title: null,
        price: null,
        imageURL: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
    })

    const addProduct = async ()=>{
        if(products.title==null || products.price==null || products.imageURL==null || products.category==null || products.description==null){
            toast.error("All fields are required")
        }
        
        setLoading(true)

        try {
            
            const productRef =collection(fireDB,"products")
            await addDoc(productRef,products)
            toast.success("Product added successfully")
            setTimeout(()=>{
            window.location.href="/dashboard"
            },800)
            getProductData()
            setLoading(false)

        } catch (error) {
            toast.error("Something went wrong")
            setLoading(false)
        }

    }

    const [product, setProduct] = useState([])

    const getProductData = async()=>{
        try {
            const q = query(
                collection(fireDB,"products"),
                orderBy("time")
            )
            const data = onSnapshot(q,(QuerySnapshot)=>{
                let ProductArray= []
                QuerySnapshot.forEach((doc)=>{
                    ProductArray.push({...doc.data(),id:doc.id})
                })
                setProduct(ProductArray)
            })

            return ()=> data
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    useEffect(()=>{
        getProductData()
    },[])

  return (
    <MyContext.Provider value={{mode,toggleMode, loading, setLoading, products, setProducts, addProduct, product}} >
        {props.children}
    </MyContext.Provider>
  )
}

export default myState