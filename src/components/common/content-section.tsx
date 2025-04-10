import React from 'react'

interface Props {
   children: React.ReactNode;
   className?: string;
}

const Section = ({ children, className = '' }: Props) => {
   return (
      <section className={`section ${className}`}>
         {children}
      </section>
   )
}

export default Section