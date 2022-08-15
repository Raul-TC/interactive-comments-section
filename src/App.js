import MainApp from './components/MainApp'
import { MainProvider } from './context/MainContext'

function App () {
  return (
    <>
      <MainProvider>
        <MainApp />
      </MainProvider>
    </>

  )
}

export default App
