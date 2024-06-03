"use client"
import React from 'react'
import {Provider} from "react-redux"
import { store } from './store'

interface Props {children: React.ReactNode}
export default function ReduxProviders({children}: Props) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}
