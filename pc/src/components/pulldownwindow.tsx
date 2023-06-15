import styles from '@/styles/pulldownwindow.module.css'
import React, { use, useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

interface Props_pulldownwindow {
    name: string;
    windowShow: (name: string, flag: boolean) => void;
    desktopWindowFlag: boolean;
    pulldownWindowShow: boolean;
}

export default function PulldownWindow(props: Props_pulldownwindow) {

    const showTitle = (props.name == "Spotterについて")

    const AboutSpotter = () => {
        return (
            <>
                <img src='/spotter.png' style={{ width: '35%', aspectRatio: '1/1', margin: '10% 0 7.5% 0', filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.3))' }}></img>
                <p style={{ fontWeight: 'bold', margin: '0', fontSize: 'max(2vh, 1vw)' }}>Spotter</p>
                <p style={{ margin: '2.5%', fontSize: 'max(1.5vh, 0.5vw)' }}>The mkybdev Desktop Experience</p>
                <p style={{ margin: '2.5%', fontSize: 'max(1.25vh, 0.25vw)' }}>Spotter バージョン 1.0</p>
                <p style={{ marginTop: '7.5%', fontSize: 'max(1.25vh, 0.25vw)' }}>&copy; 2023 mkybdev</p>
                <p style={{ margin: '1% 0 5% 0', fontSize: 'max(1.25vh, 0.25vw)' }}>All Rights Reserved.</p>
            </>
        )
    }

    const About = () => {
        return (
            <>
                <img src='/logo.png' style={{ width: '40%', margin: '0 0 0.75vh 0' }}></img>
                <p style={{ fontWeight: 'bold', margin: '5% 10% 0.25vw 10%', fontSize: 'max(2.5vh, 1.25vw)' }}>mkybdev&apos;s Website</p>
                <p style={{ fontSize: 'max(1.75vh, 0.75vw)', opacity: '0.5' }}>Next.js, 2023</p>
                <div style={{ width: 'fit-content', margin: '7.5% auto', fontSize: 'max(1.5vh, 0.5vw)', display: 'flex' }}>
                    <div style={{ textAlign: 'right', lineHeight: '150%', marginRight: '0.4vw' }}>
                        <p>アイコン</p>
                        <p>画像アイコン</p>
                        <p>壁紙</p>
                    </div>
                    <div style={{ textAlign: 'left', lineHeight: '150%', marginLeft: '0.4vw' }}>
                        <p><a href='https://github.com/react-icons/react-icons' target='_blank' rel="noreferrer">React Icons</a></p>
                        <p><a href='https://iconpacks.net/?utm_source=link-attribution&utm_content=2561' target='_blank' rel="noreferrer">Iconpacks</a></p>
                        <p><a href='https://wallpapers.com/wallpapers/macbook-pro-color-waves-art-b85a897atnb98hxc.html' target='_blank' rel="noreferrer">Wallpapers.com</a></p>
                    </div>
                </div>
                <p style={{ marginTop: '0', fontSize: 'max(1.5vh, 0.5vw)', opacity: '0.5' }}>&copy; 2023 mkybdev</p>
                <p style={{ margin: '1% 0 7.5% 0', fontSize: 'max(1.5vh, 0.5vw)', opacity: '0.5' }}>All Rights Reserved.</p>
            </>
        )
    }

    function PulldownWindow() {
        return (
            <>
                <div className={styles.pulldownwindow} style={{ zIndex: (props.pulldownWindowShow && !props.desktopWindowFlag) ? 1 : 0, backgroundColor: showTitle ? 'rgba(245, 240, 240, 1)' : 'rgba(255, 255, 255, 0.6)'}}>
                        <div className={styles.pulldownwindowtop} style={{ padding: showTitle ? '0.4vw 0.75vw' : '5%', backgroundColor: showTitle ? 'rgba(250, 240, 240, 1)' : 'transparent', border: showTitle ? '1px solid rgba(225, 210, 210, 1)' : 'none'}}>
                            <div className={styles.buttons}>
                                <button
                                    type='button'
                                    className={styles.pulldownclosebutton}
                                    onClick={() => props.windowShow("", false)}
                                >
                                    <IoCloseSharp></IoCloseSharp>
                                </button>
                                &ensp;
                                <button
                                    type='button'
                                    className={styles.pulldowndummybutton}
                                    onClick={() => {}}
                                ></button>
                                &ensp;
                                <button
                                    type='button'
                                    className={styles.pulldowndummybutton}
                                    onClick={() => {}}
                                ></button>
                            </div>
                            { showTitle && <p style={{ fontWeight: 'bold' }}>{props.name}</p> }
                        </div>
                        <div className={styles.pulldownwindowbottom}>
                            { showTitle ? <AboutSpotter></AboutSpotter> : <About></About> }
                        </div>
                </div>
            </>
        )
    }

    return (
        <>
            <PulldownWindow></PulldownWindow>
        </>
    )

  }