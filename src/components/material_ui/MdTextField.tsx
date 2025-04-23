'use client'

import { useEffect } from 'react'

export default function MdTextField() {
  useEffect(() => {
    import('@material/web/textfield/outlined-text-field.js')
  }, [])

  return (
    // <md-outlined-text-field
    //   style={{ borderRadius: '12px' }}
    //   label="Search"
    // ></md-outlined-text-field>
    <></>
  )
}
