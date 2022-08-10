import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import DetallesProducto from "../components/layout/DetallesProducto"

// Firebase
import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firebaseConfig from "../firebase/config"

const Buscar = () => {

  const router = useRouter()
  const { query: { busqueda }} = router

  const [productos, setProductos] = useState([])
  const [pFiltrados, setPFiltrados] = useState([])

  useEffect(() => {
    app.initializeApp(firebaseConfig)
    const obtenerProductos = () => {
      const db = app.firestore()
      db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProductos()
  }, [])

  useEffect(() => {
    const filtro = productos.filter(p => {
      return (
        p.nombre.toLowerCase().includes(busqueda) || 
        p.descripcion.toLowerCase().includes(busqueda)
      )
    })

    setPFiltrados(filtro)
  }, [busqueda])

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc=> {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setProductos(productos)
  }

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {pFiltrados.map(producto => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Buscar