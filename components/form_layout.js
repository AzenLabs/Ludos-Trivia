import { Suspense } from 'react'
import styles from '../styles/loginFormLayout.module.css'
import { Spinner } from '@chakra-ui/react'

export default function FormLayout(props) {
  return (
    <>
      <Suspense fallback={<Spinner size="xl" />}>
        <div w="100vw" h="100vh">
          <div className={styles.bg}></div>
          <div className={`${styles.bg} ${styles.bg2}`}></div>
          <div className={`${styles.bg} ${styles.bg3}`}></div>
          <div className="content">{props.children}</div>
        </div>
      </Suspense>
    </>
  )
}
