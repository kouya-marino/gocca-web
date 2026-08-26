import Button from '../components/Button'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found" path="/404" />
      <Section width="narrow" align="center">
        <div className={styles.wrap}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This page does not exist</h1>
          <p className={styles.body}>
            The link may be out of date, or the address slightly off. Everything on the site
            is reachable from the home page.
          </p>
          <Button to="/">Back to home</Button>
        </div>
      </Section>
    </>
  )
}
