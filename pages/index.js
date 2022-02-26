import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Model from '../components/Model'
import StatusModel from '../components/StatusModel'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instar Clone</title>
        <link rel="icon" href="/instar.png" className='h-10' />
      </Head>

      {/* Header */}
      <Header/>
       
      {/* feed */}
      <Feed/>

      {/* model */}
      <Model/>
      <StatusModel/>
      {/* <Footer/> */}
    </div>
  )
}
