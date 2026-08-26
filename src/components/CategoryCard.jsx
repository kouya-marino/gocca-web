import Icon from './Icon'
import styles from './CategoryCard.module.css'

/**
 * One gift category. The visual slot at the top takes a real product photo when
 * there is one, and falls back to an iconed gradient tile — so the page reads as
 * deliberate rather than half-finished while photography is still being shot.
 *
 * To add a photo: put the file in src/assets/, import it in src/data/gifting.js
 * and set the category's `image`. The slot crops to 4:3.
 */
export default function CategoryCard({ category }) {
  const { name, blurb, examples, icon, image } = category

  return (
    <article className={styles.card}>
      <div className={styles.visual}>
        {image ? (
          <img className={styles.image} src={image} alt={name} loading="lazy" />
        ) : (
          <span className={styles.iconWrap} aria-hidden="true">
            <Icon name={icon} size={40} />
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.blurb}>{blurb}</p>
        {examples?.length > 0 && (
          <ul className={styles.examples}>
            {examples.map((example) => (
              <li key={example} className={styles.chip}>
                {example}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
