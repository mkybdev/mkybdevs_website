import styles from '@/styles/lockform.module.css'
import { mbarlockHide } from './mbarlock'
import { mbarShow } from './mbar'
import { desktopShow } from './desktop'
import { BsArrowRightCircle } from 'react-icons/bs'
import { motion, useCycle, useAnimationControls } from 'framer-motion'
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'

export function notShow() {
    setTimeout(() => {
        const el = document.getElementById('notification')
        el!.style.animation = 'notshow forwards 0.5s ease-out'
        setTimeout(() => {
            const el2 = document.getElementById('notification')
            el2!.style.animation = 'nothide forwards 0.5s ease-out'
        }, 15000)
    }, 3000)
}

export default function LockForm() {

    const showBtn = (e: any) => {
        setPass(e.target.value)
        if (e.target.value != "") {
            if (typeof window === 'object') {
                const el = document.getElementById('passbtn')
                el!.style.visibility = 'visible'
            }
        } else {
            if (typeof window === 'object') {
                const el = document.getElementById('passbtn')
                el!.style.visibility = 'hidden'
            }
        }
    }
    const [loader, setLoader] = useState(false)
    const [pass, setPass] = useState("")
    const passctrl = useAnimationControls()
    const passCheck = (e: any) => {
        if (pass != "mkybdev") {
            const el = document.getElementById('pass')
            el!.style.pointerEvents = 'none'
            setTimeout(() => {
                passctrl.start({ x: [0, -20, 20, -20, 20, 0], transition: { ease: [0.65, 0.05, 0.36, 1], duration: 0.3 } })
                const el2 = document.getElementById('pwd')! as HTMLInputElement
                el2!.select()
                el!.style.pointerEvents = 'auto'
            }, 500)
        } else {
            const el = document.getElementById('inner')
            el!.style.display = 'none'
            const el2 = document.getElementById('notification')
            el2!.style.display = 'none'
            mbarlockHide()
            setLoader(true)
            setTimeout(() => {
                const el = document.getElementById('loader')
                el!.style.display = 'none'
                const el2 = document.getElementById('lockformwrapper')
                el2!.style.display = 'none'
                mbarShow()
                desktopShow()
            }, 1500)
        }
    }
    const isEnterkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') return
        passCheck(e)
    }
    /*const [width, setWidth] = React.useState(0)
	React.useEffect(() => {
	    setWidth(window.innerWidth)
	})
    const [r, cycleR] = useCycle(-2000, width*0.02)
    setTimeout(() => {
        cycleR()
        setTimeout(() => {
            cycleR()
        }, 10000)
    }, 3000)*/

    return (
        <>
        <style>
            {`@keyframes notshow {
                0% { right: -50vw; }
                100% { right: 2%; }
            }
            @keyframes nothide {
                0% { right: 2%; }
                100% { right: -50vw; }
            }`}
        </style>
        <div id="lockformwrapper" className={styles.lockformwrapper}>
            <div id="notification" className={styles.notification}>
                <div className={styles.noticon}>
                    <img className={styles.iconpic} src='/yoshi.jpg'></img>
                </div>
                <div className={styles.not}>
                    <div className={styles.title}>
                        <p>管理人</p>
                    </div>
                    <div className={styles.content}>
                        <p>パスワードは &quot; <b>mkybdev</b> &quot; です</p>
                    </div>
                </div>
                <div className={styles.nottime}>
                    <p>今</p>
                </div>
            </div>
            <div id="inner" className={styles.inner}>
                <img className={styles.icon} src='/logo.png'></img>
                <motion.div id="pass" className={styles.pass} animate={passctrl}>
                    <input
                    id="pwd"
                    className={styles.passwd}
                    placeholder={"パスワードを入力"}
                    type={"password"}
                    value={pass}
                    onChange={(e) => showBtn(e)}
                    onKeyDown={isEnterkey}
                    />
                    <div id="passbtn" className={styles.passbtn} onClick={(e) => passCheck(e)}><BsArrowRightCircle></BsArrowRightCircle></div>
                </motion.div>
            </div>
            <div id="loader" className={styles.loader} style={{ visibility: loader ? "visible" : "hidden" }}>
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="15"
                    visible={loader}
                />
            </div>
        </div>
        </>
    )

  }