import Link from "next/link"; import type { NextPage, GetStaticProps } from "next";
import Container from "../components/Container";
import Date from "../components/Date";

import { getSortedPostsData, PostData } from '../lib/posts';

interface HomeProps {
  allPostsData: PostData[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home: NextPage<HomeProps> = ({allPostsData}) => {
  return (
    <Container title="Blog">
  <section className={"headingMd padding1px"}>
        <h2 className="headingLg">Blog</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title }) => (
            <h3 className="listItem flex" key={id}>
              <Link className="BlogLink" href={`/posts/${id}`}>{title}</Link>
              <br />
            <small className="Date"> <Date dateString={date}/></small>
            </h3>
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default Home;
