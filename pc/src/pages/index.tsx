import Head from 'next/head'
import styles from '@/styles/index.module.css'
import MenubarLock from '@/components/mbarlock'
import LockForm from '@/components/lockform'
import Menubar from '@/components/mbar'
import Desktop from '@/components/desktop'
import Pulldown from '@/components/pulldown'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PulldownWindow from '@/components/pulldownwindow'
import { notShow } from '@/components/lockform'

export default function Home() {

    const [ pulldownShow, setPullDownShow ] = useState(false)
    const [ pulldownWindowShow, setPullDownWindowShow ] = useState(false)
    const [ pulldownData, setPullDownData ] = useState([[""]])
    const [ pulldownCoor, setPullDownCoor ] = useState(0)
    const [ windowName, setWindowName ] = useState("")
    const [ desktopWindowFlag, setDesktopWindowFlag ] = useState(false)
    const toggleShow = (coor: number, data: string[][]) => {
      setPullDownShow(!pulldownShow)
      setPullDownData(data)
      setPullDownCoor(coor)
    }
    const changeShow = (coor: number, data: string[][]) => {
      setPullDownData(data)
      setPullDownCoor(coor)
    }
    const windowShow = (name: string, flag: boolean) => {
      setWindowName(name)
      setPullDownWindowShow(flag)
      setDesktopWindowFlag(false)
    }
    const desktopWindowShow = (flag: boolean) => {
      setDesktopWindowFlag(flag)
    }

    const variants = {
      initial: {
        opacity: 1,
      },
      animate: {
        opacity: 1,
        transition: {duration: 0}
      },
      exit: {
        opacity: 0,
        transition: {duration: 0.15}
      }
    }

    const mediaCheck = () => {
      let ua = window.navigator.userAgent;
      if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('iPad') > 0){
        location.href = "https://mkybdev.com/sp/sp.html"
      }
    }

    useEffect(() => {
      mediaCheck()
      notShow()
    })

    if (typeof window === 'object') {
      window.addEventListener("orientationchange", function() {
        alert("画面の向きを元に戻してください")
        location.reload()
      })
    }

    return (
      <>
        <Head>
          <title>mkybdev&apos;s Website</title>
          <meta name="description" content="Welcome to mkybdev&apos;s Website!" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <main className={styles.main}>
          <div className={styles.frame}>
            <img src="./frame.png"></img>
          </div>
            <div className={styles.wrapper}>
              <Menubar toggleShow={toggleShow} changeShow={changeShow}></Menubar>
              <AnimatePresence>
                { pulldownShow &&
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Pulldown data={pulldownData} coor={pulldownCoor} windowShow={windowShow}></Pulldown>
                  </motion.div>
                }
              </AnimatePresence>
              <MenubarLock></MenubarLock>
              <Desktop windowShow={desktopWindowShow}></Desktop>
              { pulldownWindowShow && <PulldownWindow name={windowName} windowShow={windowShow} desktopWindowFlag={desktopWindowFlag} pulldownWindowShow={pulldownWindowShow}></PulldownWindow> }
              <LockForm></LockForm>
            </div>
        </main>
      </>
    )

}
