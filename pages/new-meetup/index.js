import React from 'react'
import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head';

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {

        const response = await fetch('/api/new-meetup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enteredMeetupData),
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }
    return (
        <>
            <Head>
                <title>New Meetups</title>
                <meta name='description' content='Add your amazing meetups' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage