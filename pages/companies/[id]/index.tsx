import { GetStaticProps, GetStaticPaths } from "next";
import { Company } from "../../../interfaces";
import Layout from "../../../components/Layout";
import ListDetail from "../../../components/ListDetail";
import { sampleCompanyData } from "../../../utils/sample-data";

type Props = {
  item?: Company;
  errors?: string;
};

const CompanyDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default CompanyDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleCompanyData.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = sampleCompanyData.find((data) => data.id === Number(id));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
