import styles from './template.module.css'
import { useEffect, useRef } from 'react';
import onClickOutside from "react-onclickoutside";


type Props = {
    modalStatus: boolean
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export const Modal = ({modalStatus, setStatus, children}: Props) => {

    const divRef = useRef<any>(null)
    
    const handleModalClick = (e: any) => {
        if(divRef.current == e.target) {
            setStatus(false)
        }
    }



    useEffect(() => {
        document.addEventListener('click', handleModalClick, true);
        return () => {
            document.removeEventListener('click', handleModalClick, true);
        };
    }, [])
    

    return (
        <div 
            ref={divRef}
            onClick={handleModalClick}
            style={modalStatus 
                ? {display:'flex'} 
                : {display:'none'}
            }
            className={styles.Container}
        >
            <div className={styles.modalBody}>
                {children}
            </div>
        </div>
    )
}