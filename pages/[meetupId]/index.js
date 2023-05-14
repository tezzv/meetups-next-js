import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
                <meta property="og:title" content={props.meetupData.title} />
                <meta property="og:description" content={props.meetupData.description} />
                <meta property="og:url" content={`https://next-js-demo-project1-git-master-tezzv.vercel.app/${props.meetupData.id}`} />
                <meta property="og:image" content={props.meetupData.image} />
            </Head>
            <MeetupDetail image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
                id={props.meetupData.id}
            />
        </>
    )
}

export async function getStaticPaths() {
    // fetch data from backend
    const client = await MongoClient.connect('mongodb+srv://tejveer:KZmHfuQjDMuiJZyN@cluster0.2kdoidj.mongodb.net/meetups');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    // fetch data from backend
    const client = await MongoClient.connect('mongodb+srv://tejveer:KZmHfuQjDMuiJZyN@cluster0.2kdoidj.mongodb.net/meetups');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetupData = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    client.close();


    return {
        props: {
            meetupData: {
                id: selectedMeetupData._id.toString(),
                image: selectedMeetupData.image,
                title: selectedMeetupData.title,
                address: selectedMeetupData.address,
                description: selectedMeetupData.description
            }
        }
    }
}

export default MeetupDetails