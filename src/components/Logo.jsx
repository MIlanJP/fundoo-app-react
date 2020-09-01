import React from 'react'
import { Typography } from '@material-ui/core'
import "../css/logo.css";

export default function Logo() {
    return (
        <Typography className="Logo" variant="h5">
          <span className="f-red">F</span>
          <span className="u-blue">u</span>
          <span className="n-yellow">n</span>
          <span className="d-red">d</span>
          <span className="o-green">o</span>
          <span className="o-blue">o</span>
        </Typography>
    )
}
