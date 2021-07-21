import React from 'react'
import { Container } from 'react-bootstrap'
import { BasicChildProp } from "../../common/types"

export default function AuthenticationWrapper({ children }: BasicChildProp) {
  return (
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{minHeight:"100vh"}}
    >
      <div className="w-100" style={{maxWidth: "400px"}}>
        { children }
      </div>
    </Container>
  )
}
