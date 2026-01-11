import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
}

const PageHead = ({ title }: PageHeadProps) => {
  return (
    <Helmet>
      <title>{title} | X-LABS.my.id</title>
    </Helmet>
  );
};

export default PageHead;
