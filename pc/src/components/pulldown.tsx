import styles from '@/styles/pulldown.module.css'
import React, { use, useEffect, useState } from 'react'

interface Props_pulldown {
    coor: number;
    data: string[][];
    windowShow: (name: string, flag: boolean) => void;
}

export default function Pulldown(props: Props_pulldown) {

    const [ pulldownName, setPulldownName ] = useState("")
    const [ pulldownWindowShow, setPulldownWindowShow ] = useState(false)

    const clickHandler = (e: any) => {
        const label = e.currentTarget.id
        switch (label) {
            case "about":
            case "aboutSpotter":
                setPulldownName(e.currentTarget.textContent)
                setPulldownWindowShow(true)
                props.windowShow(e.currentTarget.textContent, true)
                break
            case "reboot":
                window.location.reload()
                break
            case "shutdown":
                window.open('about:blank', '_self')!.close();
                break
            case "bar":
                break
            default:
                console.log("error")
                break
        }
    }
    
    return (
        <>
            <div className={styles.pulldown} style={{ left: props.coor }}>
                { props.data.map((val) => {
                        if (val[0] != "bar") {
                            return <p key={val[1]} id={val[1]} onClick={clickHandler} style={{ opacity: 0.8 }}>{val[0]}</p>
                        } else {
                            return <div key={val[1]} style={{ margin: '1vh auto', width: '92.5%', borderTop: '1px solid rgba(0, 0, 0, 0.2)' }}></div>
                        }
                    }
                )}
            </div>
        </>
    )

  }