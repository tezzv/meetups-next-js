import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'; 
import Head from 'next/head';

const HomePage = (props) => {

  return (
    <>
    <Head>
      <title>Meetups</title>
      <meta name='description' content='Some popular meetups' />
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
    revalidate: 1
  }

}

export default HomePage