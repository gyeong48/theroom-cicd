import { useNavigate } from 'react-router-dom'

const useCustomMove = () => {
  const navigate = useNavigate();

  const moveToError = () => {
    navigate({ pathname: "/error/500" })
  }

  const moveToAdminError = () => {
    navigate({ pathname: "/admin/error/500" })
  }


  return { moveToError, moveToAdminError }
}

export default useCustomMove;