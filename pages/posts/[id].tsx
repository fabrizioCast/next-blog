import { IData } from ".";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Post({ data }: { data: IData }) {
  return (
    <Layout>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <button>
        <Link href="/posts">
          <a>Go back</a>
        </Link>
      </button>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + params.id);

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

export async function getStaticPaths() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    const paths = posts.map((post: IData) => ({ params: { id: post.id.toString() } }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error(error);
  }
}
