import { useState, MouseEvent } from "react";
import type { NextPage } from "next";
// import Image from 'next/image';
import Container from "../components/Container";
import { search, mapImageResources } from "../lib/cloudinary";

type CustomImage = {
  id: string;
  title: string;
  width: number;
  height: number;
  image: string;
};

type ImageProps = {
  images: CustomImage[];
  nextCursor: string;
};

const Photo: NextPage<ImageProps> = ({ images: defaultImages, nextCursor: defaultNextCursor }) => {
  const [images, setImages] = useState<CustomImage[]>(defaultImages ?? []);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  const [error, setError] = useState<string | null>(null);


  async function handleLoadMore(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          nextCursor
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const results = await response.json();
      const { resources, next_cursor: updatedNextCursor } = results;
      const mappedImages = mapImageResources(resources);

      setImages(prev => [...prev, ...mappedImages]);
      setNextCursor(updatedNextCursor);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.');
    }
  }


  return (
    <Container title="Photo">
      <div className="headingLg">Coming Soon</div>

      {images && images.map((image?: CustomImage) => {
        // return (
        //   <div key={image?.id}>
        //     <a>
        //       <Image
        //         width={image?.width} height={image?.height} src={image?.image ?? ''} alt=""
        //       />
        //     </a>
        //     <h3>{image?.title}</h3>
        //   </div>
        // )
      })}
      {/* <p>
        <button onClick={handleLoadMore}>Load more</button>
      </p> */}
    </Container>
  )
};

export default Photo;

export async function getStaticProps() {
  const results = await search();

  const { resources, next_cursor: nextCursor } = results;

  const images = mapImageResources(resources);

  return {
    props: {
      images: images || null,
      nextCursor: nextCursor as string || null,
    }
  }
}

