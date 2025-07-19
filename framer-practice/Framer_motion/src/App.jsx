import React from 'react'
import Header from './components/Header'
import Tooltip from './components/Tooltip'
import Layout from './components/layout'
import Animate from './components/AnimatePresence'
import Variants from './components/variants'

const App = () => {
  return (
    <div>
      <Header/>
      <Tooltip/>
      <Layout/>
      <Animate/>
      {/* <Variants/> */}
    </div>
  )
}

export default App