import styles from './error-attribute-form.module.css'

type Props = {
  message: string
}

export default function ErrorAttributeForm(props: Props) {
  return (
    <span className={styles.container}>
      {props.message}
    </span>
  )
}