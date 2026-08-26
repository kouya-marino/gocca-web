import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import Icon from '../components/Icon'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import { LogoMark } from '../components/Logo'
import { excerpt, services } from '../data/services'
import { values } from '../data/values'
import { mission, testimonials } from '../data/testimonials'
import { site } from '../data/site'
import styles from './Home.module.css'

export default function Home() {
  return (
    <>
      <PageMeta
        description="Gocca Global Services builds innovative strategies for the goods exchange scenario — configuration, statistics and connectivity for brands and individuals."
        path="/"
      />

      {/* ---------------------------------------------------------- hero --- */}
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.strapline}>{site.strapline}</p>
            <h1 className={styles.heroTitle}>{site.tagline}</h1>
            <p className={styles.heroLead}>{excerpt}</p>
            <div className={styles.heroActions}>
              <Button to="/services">See what we do</Button>
              <Button to="/work-with-us" variant="secondary">
                Work with us
              </Button>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <LogoMark size={340} className={styles.heroMark} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ services --- */}
      <Section
        tone="alt"
        eyebrow="We excel at"
        title="Three things, done properly"
        lead="Whatever the brief, the work usually comes back to these."
      >
        <ul className={styles.cards}>
          {services.map((service) => (
            <li key={service.id} className={styles.card}>
              <span className={styles.cardIcon}>
                <Icon name={service.icon} size={26} />
              </span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardBody}>{service.summary}</p>
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link to="/services">More on how we work →</Link>
        </p>
      </Section>

      {/* -------------------------------------------------------- values --- */}
      <Section
        eyebrow="What we hold to"
        title="Our milestone characters"
        lead="Four habits we would rather be judged on than any tagline."
      >
        <ul className={styles.values}>
          {values.map((value) => (
            <li key={value.title} className={styles.value}>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueBody}>{value.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------- testimonials --- */}
      <Section tone="deep" eyebrow="Testimonials" title="What people tell us" align="center">
        <ul className={styles.quotes}>
          {testimonials.map((item) => (
            <li key={item.id}>
              <figure className={styles.quote}>
                <blockquote className={styles.quoteText}>“{item.quote}”</blockquote>
                <figcaption className={styles.quoteBy}>
                  <span className={styles.quoteName}>{item.name}</span>
                  <span className={styles.quoteContext}>{item.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className={styles.mission}>{mission}</p>
      </Section>

      {/* ----------------------------------------------------------- cta --- */}
      <Section align="center" width="narrow">
        <div className={styles.cta}>
          <h2 className={styles.ctaTitle}>Let’s have a coffee</h2>
          <p className={styles.ctaBody}>
            Whether you want to hire us or join us, the conversation starts the same way.
          </p>
          <Button to="/work-with-us">Get in touch</Button>
        </div>
      </Section>
    </>
  )
}
