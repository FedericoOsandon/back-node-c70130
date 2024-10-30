import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ProductPage } from './pages/ProductsPage/ProductsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductDetail } from './pages/ProductDetail/ProductDetail'

function App() {
    // ProductsPage()

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProductPage />}/>
                <Route path='/detail/:pid' element={<ProductDetail />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App
