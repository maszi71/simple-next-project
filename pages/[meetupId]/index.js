import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function meetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title> {props.meetupData.title}</title>
        <meta
          name="description"
          content= {props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </Fragment>
  );
}

export default meetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://masoud:Yro77eIUz13KTX29@cluster0.h8yse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetup");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  //get access to all object . first arg : empty object means assess to all object
  // second arg : whiech field should be extracted (here only ids)
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://masoud:Yro77eIUz13KTX29@cluster0.h8yse.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetup");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  // findOne : find single document and inside of object we determine how to search document

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
