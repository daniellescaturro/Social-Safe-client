import React from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import '../index.css'

export default function Footer(props) {

  return (
    <Segment className="footer">
      <React.Fragment>
        <p><Icon name='copyright'></Icon>Danielle Scaturro 2020</p>
      </React.Fragment>
    </Segment>
  )
}
