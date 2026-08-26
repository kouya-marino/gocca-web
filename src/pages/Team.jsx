import Button from '../components/Button'
import PageMeta from '../components/PageMeta'
import Portrait from '../components/Portrait'
import Section from '../components/Section'
import { team, teamIntro } from '../data/team'
import styles from './Team.module.css'

export default function Team() {
  return (
    <>
      <PageMeta
        title="Team"
        description="The people behind Gocca Global Services — a small team with lots of friends."
        path="/team"
      />

      <Section
        titleAs="h1"
        eyebrow="Our team"
        title={teamIntro.heading}
        lead={teamIntro.body}
        width="narrow"
      />

      <Section tone="alt">
        <ul className={styles.grid}>
          {team.map((member) => (
            <li key={member.id} className={styles.member}>
              <Portrait src={member.photo} name={member.name} />
              <h2 className={styles.name}>{member.name}</h2>
              <p className={styles.role}>{member.role}</p>
              <p className={styles.bio}>{member.bio}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section align="center" width="narrow">
        <div className={styles.cta}>
          <h2>There is room for one more</h2>
          <p className={styles.ctaBody}>
            We are a small team by choice, not by limit. If what we do sounds like something
            you would be good at, send us your CV.
          </p>
          <Button to="/work-with-us">Send your resume</Button>
        </div>
      </Section>
    </>
  )
}
