import axios from "../../axios"
import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import useWebsiteTitle from "../../hooks/useWebsiteTitle"
import useAuth from "../../hooks/useAuth"

function Hotel(props) {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [auth] = useAuth()
  const navigate = useNavigate()

  const setTitle = useWebsiteTitle()

  const fetchHotel = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/hotels/${id}.json`)
      if (res.data.status === false) navigate('/')
      setHotel(res.data)
      setTitle(`Hotel - ${res.data.name}`)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, []) 

  const rateHotel = async () => {
    try {
      await axios.put(`/hotels/${id}/rating.json?auth=${auth.token}`, rating)
      navigate('/')
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    //pobieranie danych
    fetchHotel()
  }, [fetchHotel])

  return loading ? <LoadingIcon /> : (
    <div className="card">
      <div className="card-header">
        <h1>Hotel: {hotel.name}</h1>
      </div>
      <div className="card-body">
        <img 
          src={`https://placeimg.com/420/180/arch`}
          alt=""
          className="img-fluid img-thumbnail mb-4" />
        
        <p>Miejscowość: <b>{hotel.city}</b></p>
        <p>Pokoje: <b>{hotel.rooms}</b></p>
        <p className="lead">{hotel.description}</p>
        <p>Wyposażenie:</p>
        <ul>
          {hotel.features.map(item => <li key={item}>{item}</li>)}
        </ul>
        <h4>Ocena: {hotel.rating ?? 'brak ocen'}</h4>
      </div>
      <div className="card-footer">
        {auth ? (
          <div className="input-group row mt-4">
            <div className="col">
              <select className="form-control form-select-lg mb-3" value={rating} onChange={e => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={rateHotel}>Oceń</button>
            </div>
          </div>
        ): null}
      </div>
    </div>
  )
}

export default Hotel