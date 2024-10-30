import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const ProductPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // despuès del render de return 
        const gProducts = async () => {
            const result = await fetch('http://localhost:8080/api/products').then(res => res.json())
            setProducts(result.data)
        }
        gProducts()
    }, [])
    console.log(products)
    return (
        <section>
            {
                products.map(product => (
                    <div key={product._id}>
                        <img src={product.imageUrl} alt="imgan product" />
                        <div>
                            <h2>Nombre: {product.title}</h2>
                            <p>Code: {product.code}</p>
                            <Link to={`/detail/${product._id}`}>detalle</Link>
                        </div>
                    </div>)
                )
            }
        </section>
    )
}
