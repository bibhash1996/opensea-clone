import { useRouter } from 'next/router'
import React from 'react'

function Collections() {
  const router = useRouter()
  console.log(router.query.id)
  return <div>Collections</div>
}

export default Collections
