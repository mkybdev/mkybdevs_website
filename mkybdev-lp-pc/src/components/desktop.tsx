import styles from '@/styles/desktop.module.css'
import { Stack } from '@mui/material'
import React, { use, useEffect, useState, useSyncExternalStore } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { IoCloseSharp, IoFolderOutline } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const desktopFileNum = 3
const folderNum = [6, 6]

export function desktopShow() {
    const el = document.getElementById('desktopwrapper')
    el!.style.display = 'block'
    setTimeout(() => {
        const el2 = document.getElementById('dock')
        el2!.style.animation = 'dockshow forwards 1s ease-out'
    }, 500)
}

interface Props_app {
    icon: string;
    name: string;
    url: string;
}

interface Props_dockind {
    ind: boolean;
}

interface Props_desktopfile {
    icon: string;
    name: string;
    number: number;
}

interface Props_window {
    name: string;
    number: number;
    article: (string[])[];
}

interface Props_folder {
    icon: string;
    name: string;
    url: string;
    number: number
}

interface Props_desktop {
    windowShow: (flag: boolean) => void;
}

function dockClickHandler(url: string) {
    if (url != "") window.open(url, '_blank')
}

export function DockApp(props: Props_app) {
    return (
        <div className={styles.dockicon} onClick={() => dockClickHandler(props.url)}>
            <img src={props.icon} className={styles.dockiconimg}></img>
            <div id="dockicondsc" className={styles.dockicondsc}>{props.name}</div>
        </div>
    )
}

export function DockInd(props: Props_dockind) {
    return (
        <>
        <div className={styles.dockind}>
        { props.ind && <div className={styles.ind}></div> }
        </div>
        </>
    )
}

export function Dock() {
    return (
        <>
        <style>
            {`@keyframes dockshow {
                100% { bottom: 3vh; }
            }`}
        </style>
        <div id="dock" className={styles.dock} style={{ pointerEvents: 'auto' }}>
            <div id="dockapp" className={styles.dockapp}>
                <Stack direction="row" spacing={3}>
                    <DockApp icon="./spotter.png" name="Spotter" url=""></DockApp>
                    <DockApp icon="./mail.png" name="Mail" url="mailto:contact@mkybdev.com"></DockApp>
                    <div className={styles.github} onClick={() => { window.open("https://github.com/mkybdev", '_blank') }}>
                        <img src="./github-mark-white.svg" className={styles.githubimg}></img>
                        <div className={styles.dockicondsc}>GitHub</div>
                    </div>
                    <DockApp icon="./amazon.png" name="Amazon" url="https://www.amazon.jp/hz/wishlist/ls/GYR2X8RWVJVY?ref_=wl_share"></DockApp>
                    <div className={styles.twitter} onClick={() => { window.open("https://twitter.com/_mkybtw", '_blank') }}>
                        <img src="./twitter.png" className={styles.twitterimg}></img>
                        <div className={styles.dockicondsc}>Twitter</div>
                    </div>
                    <DockApp icon="./spotify.png" name="Spotify" url="https://open.spotify.com/playlist/7oUugHTuAcpob0bRzvp9Oy?si=0c9de358399b4072"></DockApp>
                </Stack>
            </div>
            <div id="dockindicator" className={styles.dockindicator}>
                <Stack direction="row" spacing={3}>
                    <DockInd ind={true}></DockInd>
                    <DockInd ind={false}></DockInd>
                    <DockInd ind={false}></DockInd>
                    <DockInd ind={false}></DockInd>
                    <DockInd ind={false}></DockInd>
                    <DockInd ind={false}></DockInd>
                </Stack>
            </div>
        </div>
        </>
    )
}

export default function Desktop(propsD: Props_desktop) {

    const [ desktopFileSelect, setDesktopFileSelect ] = useState(new Array<boolean>(desktopFileNum).fill(false))
    const [ windowShow, setWindowShow ] = useState(true)
    const [ windowNum, setWindowNum ] = useState(-1)
    const [ windowFlag, setWindowFlag ] = useState(false)
    const [ folderCoor, setFolderCoor ] = useState([0, 0])
    const [ folderFileSelect, setFolderFileSelect ] = useState(Array<boolean>(6).fill(false))
    const [ closeAnime, setCloseAnime ] = useState('popupwindow 0s forwards')

    function DesktopFile(props: Props_desktopfile) {
        return (
            <div className={styles.desktopfile} style={{ pointerEvents: windowFlag ? 'none' : 'auto' }}>
                <div
                    id={`file${props.name}`}
                    className={styles.desktopicon}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!desktopFileSelect[props.number])
                            setDesktopFileSelect(
                                desktopFileSelect.map((bool, index) => (index == props.number ? true : false))
                            )
                    }
                    }
                    onDoubleClick={(e) => {
                        if (props.number == 2) {
                            window.open("https://mrthursday-misc.hatenablog.com", '_blank')
                        } else {
                            propsD.windowShow(true)
                            setWindowShow(false)
                            setWindowNum(props.number)
                            setWindowFlag(true)
                            if (typeof window === 'object') {
                                const el = document.getElementById(`file${props.name}` as string)
                                const el2 = document.getElementById("desktopwrapper")
                                setFolderCoor([el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left - 150, el!.getBoundingClientRect().top - el2!.getBoundingClientRect().top - 50])
                            }
                            setTimeout(() => {
                                setWindowFlag(false)
                                //propsD.windowShow(false)
                            }, 200)
                        }
                    }}
                    style={{
                        border: desktopFileSelect[props.number] ? '3px solid rgba(255, 255, 255, 0.5)' : '2px solid transparent',
                        backgroundColor: desktopFileSelect[props.number] ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
                        backdropFilter: desktopFileSelect[props.number] ? 'blur(10px)' : 'none'
                    }}
                >
                    <img src={props.icon} className={styles.desktopiconimg}></img>
                </div>
                <div
                    className={styles.desktopname}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!desktopFileSelect[props.number])
                            setDesktopFileSelect(
                                desktopFileSelect.map((bool, index) => (index == props.number ? true : false))
                            )
                    }
                    }
                    onDoubleClick={(e) => {
                        if (props.number == 2) {
                            window.open("https://mrthursday-misc.hatenablog.com", '_blank')
                        } else {
                            propsD.windowShow(true)
                            setWindowShow(false)
                            setWindowNum(props.number)
                            setWindowFlag(true)
                            if (typeof window === 'object') {
                                const el = document.getElementById(`file${props.name}` as string)
                                const el2 = document.getElementById("desktopwrapper")
                                setFolderCoor([el!.getBoundingClientRect().left - el2!.getBoundingClientRect().left - 150, el!.getBoundingClientRect().top - el2!.getBoundingClientRect().top - 50])
                            }
                            setTimeout(() => {
                                setWindowFlag(false)
                                //propsD.windowShow(false)
                            }, 200)
                        }
                    }}
                    style={{
                        backgroundColor: desktopFileSelect[props.number] ? '#2962DA' : 'transparent',
                        textShadow: desktopFileSelect[props.number] ? 'none' : '1px 2px 5px rgba(0,0,0,0.8)'
                    }}
                >
                    {props.name}
                </div>
            </div>
        )
    }

    function FolderApp(props: Props_folder) {
        return (
            <>
                <div className={styles.windowfile}>
                    <div
                        className={styles.windowicon}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!folderFileSelect[props.number])
                                setFolderFileSelect(
                                    folderFileSelect.map((bool, index) => (index == props.number ? true : false))
                                )
                        }
                        }
                        onDoubleClick={(e) => {
                            if (props.url != "")
                                window.open(props.url, '_blank')
                        }}
                        style={{
                            pointerEvents: 'auto',
                            backgroundColor: folderFileSelect[props.number] ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                            backdropFilter: folderFileSelect[props.number] ? 'blur(10px)' : 'none'
                        }}
                    >
                        <img src={props.icon} className={styles.windowiconimg}></img>
                    </div>
                    <div
                        className={styles.windowname}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (!folderFileSelect[props.number])
                                setFolderFileSelect(
                                    folderFileSelect.map((bool, index) => (index == props.number ? true : false))
                                )
                        }
                        }
                        onDoubleClick={(e) => {
                            if (props.url != "")
                                window.open(props.url, '_blank')
                        }}
                        style={{
                            pointerEvents: 'auto',
                            backgroundColor: folderFileSelect[props.number] ? '#2A62D9' : 'transparent',
                            color: folderFileSelect[props.number] ? '#FFFFFF' : '#000',
                            opacity: folderFileSelect[props.number] ? '1' : '0.9',
                        }}
                    >
                        {props.name}
                    </div>
                </div>
            </>
        )
    }

    function Window(props: Props_window) {
        const isActive = (props.number == windowNum)
        return (
            <>
                <style>
                    {`@keyframes popupwindow {
                        0% {
                            left: ${folderCoor[0]}px;
                            top: ${folderCoor[1]}px;
                            opacity: 0;
                            width: 5vw;
                            height: 3vh;
                        }
                        100% {
                            width: 60%;
                            height: 65%;
                            top: calc(50% - 5vh);
                            left: 50%;
                            transform: translateY(-50%) translateX(-50%);
                            -webkit- transform: translateY(-50%) translateX(-50%);
                            opacity: 1;
                        }
                    }`}
                </style>
                <div
                    id={`window${props.name}`}
                    className={styles.window}
                    style={{ display: isActive ? 'block' : 'none', animation: windowFlag ? 'popupwindow ease-out 0.2s forwards' : closeAnime, pointerEvents: 'none' }}
                >
                        <div
                            className={styles.windowsurface}
                        >
                            <div className={styles.windowleft}>
                                <div className={styles.windowlefttop}>
                                    <button
                                        type='button'
                                        className={styles.closebutton}
                                        onClick={(e) => {
                                            propsD.windowShow(false)
                                            e.stopPropagation()
                                            setFolderFileSelect(
                                                folderFileSelect.map(() => false)
                                            )
                                            setCloseAnime('popupwindow ease-out 0.15s reverse forwards')
                                            setTimeout(() => {
                                                setWindowShow(true)
                                                setCloseAnime('popupwindow 0s forwards')
                                            }, 200)
                                        }}
                                    >
                                        <IoCloseSharp></IoCloseSharp>
                                    </button>
                                </div>
                                <div className={styles.windowleftbottom}>
                                    <div className={styles.paneitem}>
                                        <IoFolderOutline color='#0062DA'></IoFolderOutline>
                                        <p>{props.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.windowright}>
                                <div className={styles.windowrighttop}>
                                    <IoIosArrowBack color='#BDBDBD'></IoIosArrowBack>
                                    &ensp;
                                    <IoIosArrowForward color='#BDBDBD'></IoIosArrowForward>
                                    &ensp;
                                    <p>{props.name}</p>
                                </div>
                                <div
                                    className={styles.windowrightbottom}
                                    style={{ pointerEvents: 'auto' }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setFolderFileSelect(
                                            folderFileSelect.map(() => false)
                                        )
                                    }}
                                >
                                    {(props.article[0][0] != "") && <FolderApp icon={props.article[0][0]} name={props.article[0][1]} url={props.article[0][2]} number={0}></FolderApp>}
                                    {(props.article[1][0] != "") && <FolderApp icon={props.article[1][0]} name={props.article[1][1]} url={props.article[1][2]} number={1}></FolderApp>}
                                    {(props.article[2][0] != "") && <FolderApp icon={props.article[2][0]} name={props.article[2][1]} url={props.article[2][2]} number={2}></FolderApp>}
                                    {(props.article[3][0] != "") && <FolderApp icon={props.article[3][0]} name={props.article[3][1]} url={props.article[3][2]} number={3}></FolderApp>}
                                    {(props.article[4][0] != "") && <FolderApp icon={props.article[4][0]} name={props.article[4][1]} url={props.article[4][2]} number={4}></FolderApp>}
                                    {(props.article[5][0] != "") && <FolderApp icon={props.article[5][0]} name={props.article[5][1]} url={props.article[5][2]} number={5}></FolderApp>}
                                </div>
                            </div>
                        </div>
                </div>
            </>
        )
    }

    return (
        <>
        <div
            id="desktopwrapper"
            className={styles.desktopwrapper}
            onClick={(e) => {
                setDesktopFileSelect(
                    desktopFileSelect.map(() => false)
                )
            }}
            style={{ pointerEvents: windowFlag ? 'none' : 'auto' }}
        >
            <div className={styles.desktop}>
                <DesktopFile icon="/folder.svg" name="Works" number={0}></DesktopFile>
                <DesktopFile icon="/folder.svg" name="Blog" number={1}></DesktopFile>
                <DesktopFile icon="/hatena.svg" name="はてなブログ" number={2}></DesktopFile>
            </div>
            <div className={styles.windows} style={{ visibility: windowShow ? 'hidden' : 'visible' }}>
                <Window name="Works" number={0} article={[["/crab.png", "カニじゃんけん", "https://mkybdev.com/crbrps"], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]]}></Window>
                <Window name="Blog" number={1} article={[["/No_Entry.png", "No Entry", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]]}></Window>
            </div>
            <Dock></Dock>
        </div>
        </>
    )

  }