import Button from '../components/Button'
import CategoryCard from '../components/CategoryCard'
import FormEmbed from '../components/FormEmbed'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import { categories, cta, hero, intro, process, why } from '../data/gifting'
import { site } from '../data/site'
import styles from './CorporateGifting.module.css'

export default function CorporateGifting() {
  return (
    <>
      <PageMeta
        title="Corporate Gifting"
        description="Corporate gifting from Gocca Global Services — festival hampers, branded merchandise, employee gifting and client gifts, organised end to end."
        path="/corporate-gifting"
      />

      {/* ---------------------------------------------------------- hero --- */}
      <Section titleAs="h1" eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead} width="narrow">
        <div className={styles.heroActions}>
          <Button href="#enquire">{cta.buttonLabel}</Button>
          <Button href="#categories" variant="secondary">
            See what we do
          </Button>
        </div>
      </Section>

      {/* ---------------------------------------------------- categories --- */}
      <Section id="categories" tone="alt" title={intro.heading} lead={intro.body}>
        <ul className={styles.grid}>
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- process --- */}
      <Section eyebrow="How it runs" title="From brief to delivered">
        <ol className={styles.steps}>
          {process.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------------------- why --- */}
      <Section tone="deep" eyebrow="Why us" title="What you get by working with us">
        <ul className={styles.reasons}>
          {why.map((reason) => (
            <li key={reason.title} className={styles.reason}>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonBody}>{reason.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- enquire --- */}
      <Section id="enquire" tone="alt" title={cta.title} lead={cta.body} align="center">
        <FormEmbed
          url={site.giftingFormEmbedUrl}
          height={site.giftingFormHeight}
          title="Corporate gifting enquiry form"
          fallbackTitle="The gifting enquiry form is not connected yet"
          fallbackBody="Until it is, email us with what you need — quantity, occasion and rough budget is enough to start."
          configKey="giftingFormEmbedUrl"
        />
      </Section>
    </>
  )
}
