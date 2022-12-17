
import styles from './style.module.css'
import guy from '../../assets/therock.jpg'
import github from  '../../assets/github.jpg'
import Image from 'next/image'
import { style } from '@mui/system';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthContext';
import { upperFirstLetter } from '../../helpers/firstLetterCase';
import { useRouter } from 'next/router';
import { User } from '../../types/User';
import { useState } from 'react';
import { Modal } from '../modal';
import { ModalProfileEdit } from '../modalProfileEdit';
import { useEffect } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';

type Props = {
	user: User | null
}

const Profile = ({user}: Props) => {
	const [modalStatus, setModalStatus] = useState(false)


	const { user: userContext } = useContext(AuthContext)
	const router = useRouter()
	return (
		<div className={styles.container}>
			<div className={styles.imageArea}>
				<img src={user?.background} width={12000} height={500} alt="" />
				{userContext?.id == router.query['user'] &&
					<div className={styles.options}>
						
						<button onClick={() => setModalStatus(true)}>
							<BsFillCameraFill className="mr-1" /> 
							Editar Imagens
						</button>
					</div>
				}
			</div>
			<div className={styles.info}>
				<div className={styles.infoImage}><img src={user?.avatar} alt="rounded-full" className="rounded-full w-[200px] h-[200px]"  /></div>
				<div className={styles.infoName}>{upperFirstLetter(user?.name as string)}</div>
				
				
			</div>
			<Modal modalStatus={modalStatus} setStatus={setModalStatus} >
				<ModalProfileEdit data={userContext} setModalStatus={setModalStatus} />
			</Modal>
		</div>
	);
};


export default Profile;
