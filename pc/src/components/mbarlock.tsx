import styles from '@/styles/mbarlock.module.css'
import { FaRegKeyboard } from 'react-icons/fa'
import { BsBatteryCharging } from 'react-icons/bs'
import { IoIosWifi } from 'react-icons/io'
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export function mbarlockHide() {
    const el = document.getElementById('mbarlockwrapper')
    el!.style.display = 'none'
}

export default function MenubarLock() {

    setInterval(() => {
        if (typeof window === 'object') {
            document.querySelector('#locktime')!.textContent = format(new Date(), 'M月d日(E) HH:mm', {locale:ja});
        }
    }, 1000);
    
    return (
        <>
        <div id="mbarlockwrapper" className={styles.mbarlockwrapper}>
            <p>ABC</p>
            <p className={styles.icon}><FaRegKeyboard /></p>
            <p>100%</p>
            <p className={styles.icon}><BsBatteryCharging /></p>
            <p className={styles.wifi}><IoIosWifi /></p>
            <p id="locktime"></p>
        </div>
        </>
    )

  }