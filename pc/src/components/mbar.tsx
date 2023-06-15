import styles from '@/styles/mbar.module.css'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { BsBatteryCharging } from 'react-icons/bs'
import { FaAppleAlt, FaLemon } from 'react-icons/fa'
import { GiShinyApple } from 'react-icons/gi'
import { IoIosWifi } from 'react-icons/io'
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { useState } from 'react'
import  ClickAwayListener  from '@mui/base/ClickAwayListener'

export function mbarShow() {
    const el = document.getElementById('mbarwrapper')
    el!.style.display = 'flex'
}

interface Props_menubar {
    toggleShow: (coor: number, data: string[][]) => void;
    changeShow: (coor: number, data: string[][]) => void;
}

export default function Menubar(props: Props_menubar) {

    const [ menubarClicked, setMenubarClicked ] = useState(false)
    const [ pulldownFlag, setPulldownFlag ] = useState(false)
    const [ menubarActive, setMenubarActive ] = useState([false, false])

    const clickHandler = (coor: number, data: string[][]) => {
        props.toggleShow(coor, data)
        setMenubarClicked(!menubarClicked)
        setTimeout(() => {
                setPulldownFlag(true)
        }, 100)
        setPulldownFlag(menubarClicked)
    }

    const handleClickAway = () => {
        if (pulldownFlag) {
            if (menubarClicked)
                clickHandler(0, [])
            setMenubarClicked(false)
            setPulldownFlag(false)
            setMenubarActive([false, false])
        } 
    }

    setInterval(() => {
        if (typeof window === 'object') {
            document.querySelector('#time')!.textContent = format(new Date(), 'M月d日(E) HH:mm', {locale:ja});
        }
    }, 1000);
    
    return (
        <>
        <div id="mbarwrapper" className={styles.mbarwrapper}>
            <div className={styles.left}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div
                        id="apple"
                        className={styles.apple}
                        onClick={() => {
                            let coor: number = 0;
                            if (typeof window === 'object') {
                                const el = document.getElementById("apple")
                                const el2 = document.getElementById("mbarwrapper")
                                coor = el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left
                            }
                            setMenubarActive([true, false])
                            clickHandler(coor, [["このサイトについて", "about"], ["bar", "bar"], ["再起動", "reboot"], ["システム終了", "shutdown"]])
                        }}
                        onMouseEnter={() => {
                            if (menubarClicked) {
                                let coor: number = 0;
                                if (typeof window === 'object') {
                                    const el = document.getElementById("apple")
                                    const el2 = document.getElementById("mbarwrapper")
                                    coor = el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left
                                }
                                setMenubarActive([true, false])
                                props.changeShow(coor, [["このサイトについて", "about"], ["bar", "bar"], ["再起動", "reboot"], ["システム終了", "shutdown"]])
                            }
                        }}
                        style={{ backgroundColor: menubarActive[0] ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
                    >
                        <p><GiShinyApple></GiShinyApple></p>
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div
                        id="spotter"
                        className={styles.spotter}
                        onClick={() => {
                            let coor: number = 0;
                            if (typeof window === 'object') {
                                const el = document.getElementById("spotter")
                                const el2 = document.getElementById("mbarwrapper")
                                coor = el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left
                            }
                            setMenubarActive([false, true])
                            clickHandler(coor, [["Spotterについて", "aboutSpotter"]])
                        }}
                        onMouseEnter={() => {
                            if (menubarClicked) {
                                let coor: number = 0;
                                if (typeof window === 'object') {
                                    const el = document.getElementById("spotter")
                                    const el2 = document.getElementById("mbarwrapper")
                                    coor = el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left
                                }
                                setMenubarActive([false, true])
                                props.changeShow(coor, [["Spotterについて", "aboutSpotter"]])
                            }
                        }}
                        style={{ backgroundColor: menubarActive[1] ? 'rgba(255, 255, 255, 0.3)' : 'transparent' }}
                    >
                        <p>Spotter</p>
                    </div>
                </ClickAwayListener>
            </div>
            <div className={styles.right}>
                <p>100%</p>
                <p className={styles.battery}><BsBatteryCharging /></p>
                <p className={styles.icon}><RxMagnifyingGlass /></p>
                <p className={styles.icon}><IoIosWifi /></p>
                <p id="time"></p>
            </div>
        </div>
        </>
    )

  }