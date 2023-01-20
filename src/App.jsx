/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './App.css'

// REQUIRED
// Some possible values are netflix prime disney hbo hulu peacock paramount starz showtime apple mubi

export default function App ({ listaMovies }) {
  const handledForm = (e) => {
    // e.preventDefault()
    // // eslint-disable-next-line no-undef
    // const forms = new FormData(e.target)
    // const { value } = Object.fromEntries(forms)
    // if (value.trim() === '') return
    // // todo aggragar un error de que no puede estar vacio
    // setList((prev) => [...prev, value])
    // e.target.reset()
  }

  // optimo
  // lista de usuarios 8 mil
  // const transformLista = useMemo(() => {
  //   // guardar el estado iterno en cada renderizo
  //   return (
  //     <h1>Hola</h1>
  //   )
  // }, [listaMovies])
  // console.log('🚀 ~ file: App.jsx:22 ~ transformLista ~ transformLista', transformLista)

  const handlerDescription = (desc) => {
    Swal.fire({
      title: 'Descripción',
      html: desc.length > 0 ? `<span className="text-left">${desc}</span>` : 'No hay descripción',
      icon: 'info',
      confirmButtonText: 'Cerrar'
    })
  }

  const getMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '76e65153bemshcb8044920cfe3d5p11aa28jsn9b544d30999e',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    }

    return fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=mx&service=prime&type=movie&page=2&output_language=es&language=es', options)
      .then(response => response.json())
      .then(res => res)
      .catch(err => err)
  }

  const [movies, setMovies] = useState([])
  useEffect(() => {
    const isMoviesStorage = localStorage.getItem('movies')
    if (isMoviesStorage) {
      const { res: resStorage } = JSON.parse(isMoviesStorage)
      console.log('localStorage')
      setMovies(resStorage.results)
    } else {
      getMovies().then(res => {
        console.log('fetch')
        localStorage.setItem('movies', JSON.stringify({ res }))
        setMovies(res.results)
      })
    }
  }, [])

  console.log(movies)

  return (
    <>
      <nav className='bg-blue-500 fixed top-0 w-full left-0 p-4'>
        <h1 className='text-white text-center font-bold'>Buscador de Servicios</h1>
        <div className='flex gap-1 justify-center columns-1'>
          <section className='flex-col'>
            <form id='form-list' onSubmit={handledForm} className='pt-4 w-[22rem] flex'>
              <select>
                <option value='hbo'>hbo</option>
                <option value='netflix'>netflix</option>
                <option value='prime'>prime</option>
              </select>
            </form>
            <div className='m-0'>
              {
                ['hbo', 'netflix', 'prime'].map(item => {
                  return (
                    <small key={item + Math.random()} className='font-bold text-blue-200 ml-1'>
                      {item}
                    </small>
                  )
                })
              }
            </div>
          </section>
        </div>
      </nav>
      <div className='mt-40 h-screen'>
        <h2>Ultimas añadidos</h2>
        <section className='grid grid-cols-6 mt-[8rem] scrolling-auto'>
          {
                movies?.length > 0 && movies.map(item => {
                  return (
                    <div key={item.imdbID} className='p-1 bg-fuchsia-200 rounded-md' onClick={() => handlerDescription(item.overview)}>
                      <picture>
                        <img src={item.posterURLs.original} />
                      </picture>
                      <span className=''>{item.originalTitle}</span>
                    </div>
                  )
                })
              }
          {
                movies?.length === 0 && <p>No hay peliculas disponibles en tu ciudad</p>
              }
          {
                typeof movies === 'undefined' && <p>Ya exediste el tiempo de uso de la api</p>
              }
        </section>

      </div>
    </>
  )
}
