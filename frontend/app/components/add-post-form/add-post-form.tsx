import ErrorAttributeForm from '../error-attribute-form/error-attribute-form';
import styles from './add-post-form.module.css'

import { createRef, FormEvent, useState } from "react";

type Attribute = {
  value: string
  error: string
}

type FormData = {
  isLoading: boolean
  attributes: {
    owner: Attribute,
    content: Attribute,
  }
}

const initialForm: FormData = {
  isLoading: false,
  attributes: {
    owner: {
      value: '',
      error: ''
    },
    content: {
      value: '',
      error: ''
    },
  },
}

type Props = {
  client: WebSocket
}

export default function AddPostForm({ client }: Props) {
  const [form, setForm] = useState<FormData>(initialForm)

  const ref = createRef<HTMLInputElement>();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const post = {
      owner: form.attributes.owner.value,
      content: form.attributes.content.value
    }

    let hasError = false;

    if (post.owner.length === 0) {
      hasError = true;
      setForm(prev => {
        const obj = { ...prev }
        obj.attributes.owner.error = 'Dono da postagem é requerida!'
        return obj;
      })
    }

    if (post.content.length === 0) {
      hasError = true;
      setForm(prev => {
        const obj = { ...prev }
        obj.attributes.content.error = 'Conteúdo da postagem é requerida!'
        return obj;
      })
    }

    if (hasError) {
      return;
    }

    beforeSendPost();

    const data = {
      action: "POST",
      data: {
        action: "ADD_POST",
        data: post
      }
    }
    client.send(JSON.stringify(data))

    afterSendPost();
  }

  function setError(attribute: string, error: string) {
    setForm(prev => {
      const obj = { ...prev }
      obj.attributes.content.error = error
      return obj;
    })
  }

  function beforeSendPost() {
    setForm(prev => {
      const obj = { ...prev }
      obj.isLoading = true
      return obj;
    })
  }

  function afterSendPost() {
    setForm(prev => {
      const obj = { ...prev }
      obj.isLoading = false
      obj.attributes.content.value = '';
      obj.attributes.content.error = '';
      return obj;
    })
    ref.current?.focus();
  }

  return (
    <form className={styles.container} onSubmit={submit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Dono da postagem</label>
        <input
          placeholder='John Wick'
          maxLength={20}
          className={styles.input}
          ref={ref}
          name="owner"
          value={form.attributes.owner.value}
          onChange={e => setForm(prev => {
            const obj = { ...prev }
            obj.attributes.owner.value = e.target.value;
            return obj;
          })} />
        <div className={styles.messageError}>
          {form.attributes.owner.error.length > 0 && (
            <ErrorAttributeForm message={form.attributes.owner.error} />
          )}
        </div>
        <div className={styles.inputBottom}>
          <div className={styles.inputLength}>{form.attributes.owner.value.length}/20</div>
        </div>

      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Conteúdo</label>
        <textarea
          placeholder='O que você está pensando?'
          maxLength={120}
          className={`${styles.input} ${styles.inputContent}`}
          name="content"
          value={form.attributes.content.value}
          onChange={e => setForm(prev => {
            const obj = { ...prev }
            obj.attributes.content.value = e.target.value;
            return obj;
          })} />
        <div className={styles.messageError}>
          {form.attributes.content.error.length > 0 && (
            <ErrorAttributeForm message={form.attributes.content.error} />
          )}
        </div>
        <div className={styles.inputBottom}>
          <div className={styles.inputLength}>{form.attributes.content.value.length}/120</div>
          <button className={styles.button} type="submit">Postar</button>
        </div>
      </div>
    </form>
  )
}