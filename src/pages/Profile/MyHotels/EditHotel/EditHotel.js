import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIcon from '../../../../components/UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../../../context/AuthContext';
import axios from '../../../../firebase/axios';
import HotelForm from '../HotelForm';

const EditHotel = (props) => {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.patch(`/hotels/${id}.json?auth=${user.token}`, form)
    navigate('/profil/hotele?update')
  }

  const fetchHotel = useCallback(async () => {
    const res = await axios.get(`/hotels/${id}.json`)
    const hotelData = res.data

    delete(hotelData.user_id)
    delete(hotelData.rating)

    setHotel(hotelData)
    setLoading(false)
  }, [id]) 

  useEffect(() => {
    fetchHotel()
  }, [fetchHotel])

  return loading ? <LoadingIcon /> : (
    <>
      {hotel && <HotelForm hotel={hotel} buttonText="Zapisz!" onSubmit={submit} />}
    </>
  )
}

export default EditHotel;