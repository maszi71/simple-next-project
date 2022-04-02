import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetup() {
  const router = useRouter();
  async function addMeetupHandler(submittedForm) {
    console.log(submittedForm);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(submittedForm),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title> Add new meetup</title>
        <meta name="description" content="create new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetup;
