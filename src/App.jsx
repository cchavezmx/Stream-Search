import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
// https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/
// https://flowbite.com/tools/tailwind-cheat-sheet/

import './App.css'

export default function App () {
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
        'X-RapidAPI-Key': '20833e1faemsh1ac4de30e1e813dp14d672jsnfcbb2e631bed',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    }

    return fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=mx&service=prime&type=series&page=1&output_language=es&language=es', options)
      .then(response => response.json())
      .then(res => res)
      .catch(err => console.error(err))
  }

  const [movies, setMovies] = useState([])
  useEffect(() => {
    getMovies().then(res => {
      setMovies(res.results)
    })
  }, [])

  console.log(movies)

  return (
    <>
      <nav className='bg-blue-500 fixed top-0 w-full left-0 p-4'>
        <h1 className='text-white text-center font-bold'>Stream Search</h1>
        <div className='flex gap-1 justify-center columns-1'>
          <section className='flex-col'>
            <form id='form-list' onSubmit={handledForm} className='pt-4 w-[22rem] flex'>
              <input
                className='p-2 border-2 border-gray-300 rounded-md flex-auto text-center'
                placeholder='¿Qué quieres ver?'
                name='value'
              />
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
                movies.length > 0 && movies.map(item => {
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
        </section>

      </div>
    </>
  )
}
