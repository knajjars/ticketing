import axios from 'axios'
import toast from 'cogo-toast'

const useRequest = ({ url, body, method, onSuccess }) => {
  const doRequest = async () => {
    try {
      const { data } = await axios[method](url, body)

      if (onSuccess) {
        onSuccess(data)
      }

      return data
    } catch (err) {
      const errors = err.response.data.errors

      for (const error of errors) {
        toast.error(error.message, { position: 'top-right' })
      }
    }
  }

  return { doRequest }
}

export default useRequest
