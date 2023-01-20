import { useState, useMemo } from 'react'
// useMemo => useState y useEffect => es guarda el estado interno, si no cambian los valores del arreglo de dependecias.
// useCallback === useMemo => 'funciones'  menos usados => debounce

// useRef => memoriza para el manejo del DOM
// Custom Hooks

const ClassMemo = () => {
  const [valueSelect, setValeSelect] = useState('')
  const handledSelect = (e) => {
    setValeSelect(e.target.value)
  }

  const getMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '20833e1faemsh1ac4de30e1e813dp14d672jsnfcbb2e631bed',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    }

    return fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=mx&service=prime&type=movie&page=2&output_language=es&language=es', options)
      .then(response => response.json())
      .then(res => res)
      .catch(err => console.error(err))
  }

  //   useEffect(() => {
  //     getMovies().then(res => console.log(res))
  //   }, [valueSelect])

  const movies = useMemo(() => {
    getMovies().then(res => res)
  }, [valueSelect])

  console.table({ movies })

  return (
    <main className='w-screen flex justify-center flex-col items-center'>
      <p>Estas viendo todos los programas de: {valueSelect}</p>
      <select className='bg-blue-50 p-2 w-[200px] rounded-sm' onChange={handledSelect}>
        <option value='hbo'>hbo</option>
        <option value='netflix'>netflix</option>
        <option value='prime'>prime</option>
      </select>
    </main>
  )
}

export default ClassMemo
