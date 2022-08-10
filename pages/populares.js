import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import DetallesProducto from "../components/layout/DetallesProducto";

// Firebase
import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import firebaseConfig from "../firebase/config"

const Populares = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    app.initializeApp(firebaseConfig)
    const obtenerProductos = () => {
      const db = app.firestore()
      db.collection('productos').orderBy('votos', 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProductos()
  }, [])

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
              {productos.map(producto => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Populares