import Error404 from '../components/fallbacks/Error404';

const Page = () => <Error404 />;

Page.allowNonAuthenticated = true;
Page.allowAuthenticated = true;

export default Page;
