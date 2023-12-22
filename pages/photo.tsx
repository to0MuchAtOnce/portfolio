import type { NextPage } from 'next';
import Container from '../components/Container';
import { getFolders } from '../lib/cloudinary';
import Link from 'next/link';
import Card from '../components/ProjectCard';
import { PhotoCards } from '@/components/PhotoCard/PhotoCard.styles';

type CustomFolder = {
  id: string;
  name: string;
  path: string;
  firstImage: string;
};

type FolderProps = {
  folders: CustomFolder[];
};

const Photo: NextPage<FolderProps> = ({ folders }) => {
  return (
    <Container title='Photo'>
      <div className='headingLg'>Photo</div>

      <div className='photo-cards-container'>
        {folders &&
          folders.map((folder) => {
            const linkTitle = folder?.name
              ? folder?.name.charAt(0).toUpperCase() + folder?.name.slice(1)
              : '';
            return (
              <div key={folder.id}>
                <PhotoCards>
                  <Link href={`/folder/${folder?.path}`} passHref>
                    <Card image={folder?.firstImage} title={folder?.name}>
                      <div className='linkTitle'>{linkTitle}</div>
                    </Card>
                  </Link>
                </PhotoCards>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default Photo;

export async function getStaticProps() {
  const { folders = [] } = await getFolders();

  return {
    props: {
      folders,
    },
  };
}
