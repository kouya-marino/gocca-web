import Button from '../components/Button'
import Icon from '../components/Icon'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import { excerpt, services } from '../data/services'
import styles from './Services.module.css'

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services"
        description="Configurations, statistics and connectivity — how Gocca Global Services helps brands and individuals organise, measure and grow their goods exchange."
        path="/services"
      />

      <Section titleAs="h1" eyebrow="Services" title="We excel at" lead={excerpt} width="narrow" />

      <Section tone="alt" className={styles.detailSection}>
        <ol className={styles.list}>
          {services.map((service, index) => (
            <li key={service.id} id={service.id} className={styles.item}>
              <div className={styles.marker}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.icon}>
                  <Icon name={service.icon} size={26} />
                </span>
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{service.title}</h2>
                <p className={styles.summary}>{service.summary}</p>
                <p className={styles.detail}>{service.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section align="center" width="narrow">
        <div className={styles.cta}>
          <h2>Not sure which one you need?</h2>
          <p className={styles.ctaBody}>
            Most engagements start as one and turn into another. Tell us what is slowing you
            down and we will say which of the three actually applies.
          </p>
          <Button to="/work-with-us">Start a conversation</Button>
        </div>
      </Section>
    </>
  )
}
