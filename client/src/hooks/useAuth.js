 
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('auth')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ email: payload.email })
      } catch (err) {
        setUser(null)
      }
    }
  }, [])

  return user
}
