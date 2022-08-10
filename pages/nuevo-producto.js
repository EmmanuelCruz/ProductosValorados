import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"
import styled from '@emotion/styled'
import validarCrearProducto from "../validacion/validarCrearProducto"
import { useRouter } from "next/dist/client/router"

import Router from 'next/router'

// Firebase
import app from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import firebaseConfig from "../firebase/config"

// Validaciones
import useValidacion from "../hooks/useValidacion"
import useAutenticacion from "../hooks/useAutenticacion"

const stateInicial = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: ''
}

const Titulo = styled.h1`
  text-align: center;
  margin-top: 5rem;
`
const NuevoProducto = () => {
  const { valores, errores, handleChange, handleSubmit } = useValidacion(stateInicial, validarCrearProducto, crearProducto)
  const { nombre, empresa, imagen, url, descripcion } = valores

  const [error, setError] = useState(false)
  const [nombreImagen, setNombreImagen] = useState('')
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlImagen, setUrlImagen] = useState('')
  const [storage, setStorage] = useState(null)

  const [usuario, auth] = useAutenticacion()
  
  useEffect(() => {
    app.initializeApp(firebaseConfig);
    setStorage(app.storage())
  }, [usuario])

  const router = useRouter()

  async function crearProducto() {
    if (!usuario) {
      return router.push('/login')
    }

    const producto = {
      nombre, empresa, url, descripcion, votos: 0, comentarios: [], creado: Date.now(), urlImagen,
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      }
    }

    // Insertar en la base de datos
    const db = app.firestore()
    db.collection('productos').add(producto)
    router.push('/')
  }

  const handleImagenUpload = async e => {
    const file = e.target.files[0]

    const storageRef = await storage.ref('productos')

    const fileRef = storageRef.child(file.name)

    await fileRef.put(file);

    setUrlImagen(await fileRef.getDownloadURL())
  }

  return (
    <div>
      <Layout>
        <>
          <Titulo>Nuevo Producto</Titulo>

          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >

            <fieldset>
              <legend>Información general</legend>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type='text'
                  id='nombre'
                  placeholder="Escribe tu nombre"
                  name='nombre'
                  value={nombre}
                  onChange={handleChange}
                />
              </Campo>

              {errores.nombre && <Error>{errores.nombre}</Error>}

              <Campo>
                <label htmlFor="empresa">Empresa</label>
                <input
                  type='text'
                  id='empresa'
                  placeholder="Escribe tu empresa"
                  name='empresa'
                  value={empresa}
                  onChange={handleChange}
                />
              </Campo>

              {errores.empresa && <Error>{errores.empresa}</Error>}

              <Campo>
                <label htmlFor="imagen">Imagen</label>
                <input
                  type='file'
                  id='imagen'
                  accept='image/*'
                  name='imagen'
                  onChange={handleImagenUpload}
                />
              </Campo>


              <Campo>
                <label htmlFor="url">URL</label>
                <input
                  type='url'
                  id='url'
                  name='url'
                  value={url}
                  onChange={handleChange}
                />
              </Campo>

              {errores.url && <Error>{errores.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>
              <Campo>
                <label htmlFor="descripcion">Descripcion</label>
                <textarea
                  id='descripcion'
                  name='descripcion'
                  value={descripcion}
                  onChange={handleChange}
                />
              </Campo>

              {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type='submit' value='Crear producto' />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default NuevoProducto
