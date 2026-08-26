import FormEmbed from '../components/FormEmbed'
import PageMeta from '../components/PageMeta'
import Section from '../components/Section'
import { site } from '../data/site'
import styles from './WorkWithUs.module.css'

export default function WorkWithUs() {
  return (
    <>
      <PageMeta
        title="Work With Us"
        description="Hire Gocca Global Services, or join the team. Send us your resume or a short note about what you need."
        path="/work-with-us"
      />

      <Section
        titleAs="h1"
        eyebrow="Work with us"
        title="Let’s have a coffee"
        lead="Hiring us or joining us — either way, start here. We read everything that comes in and reply to the ones we can help."
        width="narrow"
      />

      <Section tone="alt">
        <FormEmbed
          url={site.googleFormEmbedUrl}
          height={site.googleFormHeight}
          title="Work with Gocca — enquiry and resume form"
          configKey="googleFormEmbedUrl"
        />
      </Section>

      <Section width="narrow">
        <div className={styles.contact}>
          <h2 className={styles.contactTitle}>Other ways to reach us</h2>
          <dl className={styles.details}>
            <div className={styles.row}>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            {site.location && (
              <div className={styles.row}>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
            )}
          </dl>
        </div>
      </Section>
    </>
  )
}
