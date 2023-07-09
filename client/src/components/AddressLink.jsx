import React from 'react'

export default function AddressLink({children, className = null}) {
  if (!className) {
		className = 'block'
	}
	className += ' flex gap-1 underline text-sm font-semibold'
	return (
    <a
    className={className}
    target="_blank"
    href={`https://maps.google.com/?q=${children}`}
  >
    {children}
  </a>
  )
}
