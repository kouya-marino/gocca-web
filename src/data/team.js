/**
 * Ankush's role and bio are the original 2020 copy. The other two entries were
 * Lorem Ipsum on the old site, so their bios are DRAFT — and the third member
 * had no name at all ("Third Person"), so that card is commented out rather
 * than invented. Uncomment and fill it in when there is a real person to name.
 *
 * `photo: null` renders a monogram tile (see components/Portrait.jsx). To use a
 * real photo, drop the file into src/assets/, import it at the top of this file,
 * and set `photo` to the import. Portrait crops to a 7:9 portrait ratio, so
 * supply something at least 420×540.
 */

export const teamIntro = {
  heading: 'We are a small team with lots of friends!',
  body: 'Contrary to popular belief, this team came together effortlessly! There is constant mutual interaction and we are here to stay!',
}

export const team = [
  {
    id: 'ankush-sharma',
    name: 'Ankush Sharma',
    role: 'CEO & Product Manager',
    bio: 'The ideator and the driving force behind the site. Has been the backbone and a hard worker bringing the whole project together.',
    photo: null,
  },
  {
    id: 'prashant-rawat',
    name: 'Prashant Rawat',
    role: 'Technology Head',
    // DRAFT — the 2020 site had Lorem Ipsum here.
    bio: 'Builds and looks after everything Gocca runs on. Prefers systems that are boring to operate and quick to change.',
    photo: null,
  },
  // {
  //   id: 'third-member',
  //   name: 'TODO: real name',
  //   role: 'Human Resource',
  //   bio: 'TODO',
  //   photo: null,
  // },
]
