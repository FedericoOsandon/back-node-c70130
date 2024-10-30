import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const ProductDetail = () => {
    const [product, setProduct] = useState([])
    const { pid } = useParams()

    useEffect(() => {
        // despuès del render de return 
        const gProduct = async () => {
            const result = await fetch(`http://localhost:8080/api/products/${pid}`).then(res => res.json())
            setProduct(result.data)
        }
        gProduct()
    }, [])
    
    return (
        <div>
            <div>

               <img src={product.imageUrl}/>

            </div>
            <div>
                <h2>{product.title}</h2>
                <p>{product.code}</p>
            </div>
        </div>
    )
}
