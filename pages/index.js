import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {

  return (
    <>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>Meetups</title>
        <meta name="description" content="Find the best places to meet up with friends and family while exploring popular tourist spots and historic monuments." />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://next-js-demo-project1-git-master-tezzv.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Meetups" />
        <meta property="og:description" content="Find the best places to meet up with friends and family while exploring popular tourist spots and historic monuments." />
        <meta property="og:image" content="https://next-js-demo-project1-git-master-tezzv.vercel.app/images/meetups-preview.jpeg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="next-js-demo-project1-git-master-tezzv.vercel.app" />
        <meta property="twitter:url" content="https://next-js-demo-project1-git-master-tezzv.vercel.app/" />
        <meta name="twitter:title" content="Meetups" />
        <meta name="twitter:description" content="Find the best places to meet up with friends and family while exploring popular tourist spots and historic monuments." />
        <meta name="twitter:image" content="https://next-js-demo-project1-git-master-tezzv.vercel.app/images/meetups-preview.jpeg" />
      </Head>
      <MeetupList meetups={props.meetups} />

    </>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from backend
  const client = await MongoClient.connect('mongodb+srv://tejveer:KZmHfuQjDMuiJZyN@cluster0.2kdoidj.mongodb.net/meetups');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }

}

export default HomePage