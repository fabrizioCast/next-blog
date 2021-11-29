import React from "react";
import Link from "next/link";
import Image from "next/dist/client/image";
import Layout from "../../components/Layout";

export interface IData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const index = ({ data }: { data: IData[] }) => {
  // Si no es necesario el SEO, se puede hacer la peticion del lado del cliente con SWR
  //const { data, error } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher);

  return (
    <Layout title="App | Post">
      <h1>First Post</h1>
      <h1>
        Go to {""}
        <Link href="/">
          <a>Home</a>
        </Link>
      </h1>
      <Image
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
      {data.map((post: IData) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>
              {post.id} - {post.title}
            </a>
          </Link>
          <hr />
        </div>
      ))}
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      let error = {
        status: res.status,
        statusText: res.statusText,
      };
      throw error;
    }

    const data = await res.json();
    return {
      props: {
        data,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.log(error);
  }
}

export default index;
