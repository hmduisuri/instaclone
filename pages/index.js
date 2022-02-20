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
        <title>Insta 1.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header/>
       
      {/* feed */}
      <Feed/>

      {/* model */}
      <Footer/>
      <Model/>
      <StatusModel/>
    </div>
  )
}
